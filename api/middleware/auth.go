package middleware

import (
	"errors"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/matthew-torres/pocket-caddie/api/models"
)

var jwtsecret = []byte(os.Getenv("JWT_SECRET"))

type JWTClaim struct {
	UID   int    `json:"UID"`
	Email string `json:"Email"`
	jwt.RegisteredClaims
}

func generateJWT(user *models.User) (string, error) {

	expirationTime := time.Now().Add(1 * time.Hour)
	claims := &JWTClaim{
		UID:   user.UID,
		Email: user.Email,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(jwtsecret)
	if err != nil {
		return "", err
	}
	return tokenString, err
}

func ValidateJWT(signedToken string) error {
	token, err := jwt.ParseWithClaims(signedToken, &JWTClaim{},
		func(token *jwt.Token) (interface{}, error) {
			return []byte(jwtsecret), nil
		})
	if err != nil {
		return nil
	}
	claims, ok := token.Claims.(*JWTClaim)
	if !ok {
		err = errors.New("couldn't parse claims")
		return err
	}
	if claims.ExpiresAt.Time.Local().Unix() < time.Now().Local().Unix() {
		err = errors.New("token expired")
		return err
	}
	return nil
}
