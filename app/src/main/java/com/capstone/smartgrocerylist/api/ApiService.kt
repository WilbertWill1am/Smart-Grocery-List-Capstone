package com.capstone.smartgrocerylist.api

import com.capstone.smartgrocerylist.data.model.login.LoginResponse
import com.capstone.smartgrocerylist.data.model.signup.SignUpResponse
import retrofit2.http.*

interface ApiService {
    @FormUrlEncoded
    @POST("users")
    suspend fun postSignUp(
        @Field("username") name: String,
        @Field("email") email: String,
        @Field("password") password: String,
        @Field("confPassword") confPassword: String,
    ): SignUpResponse

    @FormUrlEncoded
    @POST("login")
    suspend fun postLogin(
        @Field("email") email: String,
        @Field("password") password: String,
    ): LoginResponse
}