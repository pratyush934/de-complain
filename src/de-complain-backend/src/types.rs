use serde::{Deserialize, Serialize};
use candid::{CandidType, Principal};
use std::collections::HashMap;

#[derive(CandidType, Serialize, Deserialize, Clone, Debug)]
pub struct Complaint {
    pub id: String,
    pub title: String,
    pub description: String,
    pub category: String,
    pub user: Principal,
    pub status: String, // "pending", "in-progress", "resolved"
    pub upvotes: u32,
    pub comments: Vec<Comment>,
}

#[derive(CandidType, Serialize, Deserialize, Clone, Debug)]
pub struct Comment {
    pub user: Principal,
    pub text: String,
}

#[derive(CandidType, Serialize, Deserialize, Clone, Debug)]
pub struct User {
    pub principal: Principal,
    pub complaints: Vec<String>, // Complaint IDs
}
