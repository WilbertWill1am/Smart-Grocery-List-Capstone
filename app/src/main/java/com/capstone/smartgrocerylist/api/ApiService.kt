package com.capstone.smartgrocerylist.api

import com.capstone.smartgrocerylist.data.model.login.LoginResponse
import com.capstone.smartgrocerylist.data.model.signup.SignUpResponse
import retrofit2.http.*

interface ApiService {
    @FormUrlEncoded
    @POST("register")
    suspend fun postSignUp(
        @Field("name") name: String,
        @Field("email") email: String,
        @Field("password") password: String,
    ): SignUpResponse

    @FormUrlEncoded
    @POST("login")
    suspend fun postLogin(
        @Field("email") email: String,
        @Field("password") password: String,
    ): LoginResponse
}