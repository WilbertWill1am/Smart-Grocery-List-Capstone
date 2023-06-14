package com.capstone.smartgrocerylist.ui.auth.signup

import androidx.lifecycle.ViewModel
import com.capstone.smartgrocerylist.data.GroceryRepository

class SignUpViewModel(private val storyRepository: GroceryRepository) : ViewModel() {
    fun signUp(name: String, email: String, password: String) =
        storyRepository.postSignUp(name, email, password)
}