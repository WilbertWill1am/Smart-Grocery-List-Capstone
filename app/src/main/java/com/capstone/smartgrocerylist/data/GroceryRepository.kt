package com.capstone.smartgrocerylist.data

import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.liveData
import com.capstone.smartgrocerylist.api.ApiService
import com.capstone.smartgrocerylist.data.model.login.LoginResponse
import com.capstone.smartgrocerylist.data.model.signup.SignUpResponse
import kotlinx.coroutines.Dispatchers

class GroceryRepository(private val apiService: ApiService) {
    fun postSignUp(
        name: String,
        email: String,
        password: String,
        confPassword: String,
    ): LiveData<Result<SignUpResponse>> = liveData(Dispatchers.IO) {
        emit(Result.Loading)
        try {
            val response = apiService.postSignUp(name, email, password, confPassword)
            emit(Result.Success(response))
        } catch (e: Exception) {
            Log.e("SignUpViewModel", "postSignUp: ${e.message.toString()}")
            emit(Result.Error(e.message.toString()))
        }
    }

    fun postLogin(email: String, password: String): LiveData<Result<LoginResponse>> =
        liveData(Dispatchers.IO) {
            emit(Result.Loading)
            try {
                val response = apiService.postLogin(email, password)
                emit(Result.Success(response))
            } catch (e: Exception) {
                Log.e("LoginViewModel", "postLogin: ${e.message.toString()}")
                emit(Result.Error(e.message.toString()))
            }
        }
}