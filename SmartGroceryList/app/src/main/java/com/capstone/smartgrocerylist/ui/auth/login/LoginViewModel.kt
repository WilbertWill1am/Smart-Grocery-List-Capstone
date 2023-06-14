package com.capstone.smartgrocerylist.ui.auth.login

import androidx.lifecycle.ViewModel
import com.capstone.smartgrocerylist.data.GroceryRepository

class LoginViewModel(private val storyRepository: GroceryRepository) : ViewModel() {
    fun login(email: String, password: String) =
        storyRepository.postLogin(email, password)
}