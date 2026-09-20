import os
from datetime import datetime, timedelta, timezone

import jwt
from dotenv import load_dotenv
from fastapi import FastAPI, Header, HTTPException
from pydantic import BaseModel

load_dotenv(".env.local")
load_dotenv()

app = FastAPI()

JWT_ALGORITHM = "HS256"
SESSION_DURATION = timedelta(seconds=60 * 60 * 24 * 7)  # 7 days


class LoginRequest(BaseModel):
    id: str
    password: str


class LoginResponse(BaseModel):
    token: str


class VerifyResponse(BaseModel):
    username: str
    iat: int
    exp: int


def get_secret_key() -> str:
    secret = os.environ.get("JWT_SECRET")
    if not secret:
        raise RuntimeError("JWT_SECRET environment variable is not set")
    return secret


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/login", response_model=LoginResponse)
def login(payload: LoginRequest):
    if payload.id != "admin" or payload.password != "password":
        raise HTTPException(status_code=401, detail="Invalid id or password")

    now = datetime.now(timezone.utc)
    token = jwt.encode(
        {"username": payload.id, "iat": now, "exp": now + SESSION_DURATION},
        get_secret_key(),
        algorithm=JWT_ALGORITHM,
    )
    return LoginResponse(token=token)


@app.get("/verify", response_model=VerifyResponse)
def verify(authorization: str = Header(...)):
    scheme, _, token = authorization.partition(" ")
    if scheme.lower() != "bearer" or not token:
        raise HTTPException(status_code=401, detail="Invalid authorization header")

    try:
        payload = jwt.decode(token, get_secret_key(), algorithms=[JWT_ALGORITHM])
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

    return VerifyResponse(**payload)
