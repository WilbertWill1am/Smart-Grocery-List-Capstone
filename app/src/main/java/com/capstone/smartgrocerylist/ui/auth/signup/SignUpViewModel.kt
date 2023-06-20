package com.capstone.smartgrocerylist.ui.auth.signup

import androidx.lifecycle.ViewModel
import com.capstone.smartgrocerylist.data.GroceryRepository

class SignUpViewModel(private val groceryRepository: GroceryRepository) : ViewModel() {
    fun signUp(name: String, email: String, password: String, confPassword: String) =
        groceryRepository.postSignUp(name, email, password, confPassword)
}