package utils

import (
	"fmt"
	"os"
	"strconv"
	"strings"
	"time"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

func GenerateToken(uid int) (string, error) {
	token_lifespan, err := strconv.Atoi(os.Getenv("TOKEN_HOUR_LIFESPAN"))

	if err != nil {
		fmt.Printf("token hour error: %s\n", err)
		return "", err
	}

	claims := jwt.MapClaims{}
	claims["authorized"] = true
	claims["uid"] = uid
	claims["exp"] = time.Now().Add(time.Hour * time.Duration(token_lifespan)).Unix()
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	return token.SignedString([]byte(os.Getenv("API_SECRET")))
}

func TokenValid(c *gin.Context) error {
	tokenString := ExtractToken(c)
	_, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(os.Getenv("API_SECRET")), nil
	})
	if err != nil {
		return err
	}
	return nil
}

func ExtractToken(c *gin.Context) string {
	token := c.Query("token")
	if token != "" {
		return token
	}
	bearerToken := c.Request.Header.Get("Authorization")
	if len(strings.Split(bearerToken, " ")) == 2 {
		return strings.Split(bearerToken, " ")[1]
	}
	return ""
}

func ExtractTokenID(c *gin.Context) (int, error) {

	tokenString := ExtractToken(c)
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(os.Getenv("API_SECRET")), nil
	})
	if err != nil {
		return 0, err
	}
	claims, ok := token.Claims.(jwt.MapClaims)
	if ok && token.Valid {
		uid, err := strconv.ParseInt(fmt.Sprintf("%.0f", claims["uid"]), 10, 32)
		if err != nil {
			return 0, err
		}
		return int(uid), nil
	}
	return 0, nil
}

// var jwtsecret = []byte(os.Getenv("JWT_SECRET"))

// type JWTClaim struct {
// 	UID   int    `json:"UID"`
// 	Email string `json:"Email"`
// 	jwt.RegisteredClaims
// }

// func generateJWT(user *models.User) (string, error) {

// 	expirationTime := time.Now().Add(1 * time.Hour)
// 	claims := &JWTClaim{
// 		UID:   user.UID,
// 		Email: user.Email,
// 		RegisteredClaims: jwt.RegisteredClaims{
// 			ExpiresAt: jwt.NewNumericDate(expirationTime),
// 		},
// 	}
// 	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
// 	tokenString, err := token.SignedString(jwtsecret)
// 	if err != nil {
// 		return "", err
// 	}
// 	return tokenString, err
// }

// func ValidateJWT(signedToken string) error {
// 	token, err := jwt.ParseWithClaims(signedToken, &JWTClaim{},
// 		func(token *jwt.Token) (interface{}, error) {
// 			return []byte(jwtsecret), nil
// 		})
// 	if err != nil {
// 		return nil
// 	}
// 	claims, ok := token.Claims.(*JWTClaim)
// 	if !ok {
// 		err = errors.New("couldn't parse claims")
// 		return err
// 	}
// 	if claims.ExpiresAt.Time.Local().Unix() < time.Now().Local().Unix() {
// 		err = errors.New("token expired")
// 		return err
// 	}
// 	return nil
// }
