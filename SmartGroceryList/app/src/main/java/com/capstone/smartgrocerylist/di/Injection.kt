package com.capstone.smartgrocerylist.di

import android.content.Context
import com.capstone.smartgrocerylist.api.ApiConfig
import com.capstone.smartgrocerylist.data.GroceryRepository

object Injection {
    fun provideRepository(context: Context): GroceryRepository {
        val apiService = ApiConfig.getApiService(context)
        return GroceryRepository(apiService)
    }
}