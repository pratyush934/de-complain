use crate::types::{Comment, Complaint, User};
use candid::{Nat, Principal};
use ic_cdk::api::caller;
use ic_cdk::println;
use ic_cdk::storage;
use ic_cdk_macros::*;
use std::collections::HashMap;

mod types;

// Store complaints & users
type ComplaintStore = HashMap<String, Complaint>;
type UserStore = HashMap<Principal, User>;

// ✅ Initialize memory storage
#[init]
fn init() {
    match storage::stable_save((
        HashMap::<String, Complaint>::new(),
        HashMap::<Principal, User>::new(),
    )) {
        Ok(_) => println!("Storage initialized successfully."),
        Err(err) => println!("Error initializing storage: {:?}", err),
    }
}
#[update]
fn submit_complaint(title: String, description: String, category: String) -> String {
    let user = caller();
    let id = format!("{}", ic_cdk::api::time());

    let complaint = Complaint {
        id: id.clone(),
        title,
        description,
        category,
        user,
        status: "pending".to_string(),
        upvotes: Nat::from(0),
        comments: Vec::new(),
    };

    let (mut complaints, mut users): (ComplaintStore, UserStore) =
        storage::stable_restore().unwrap();

    complaints.insert(id.clone(), complaint);
    users
        .entry(user)
        .or_insert(User {
            principal: user,
            complaints: Vec::new(),
        })
        .complaints
        .push(id.clone());

    storage::stable_save((complaints, users)).unwrap();
    id
}

// ✅ Get all complaints
#[query]
fn get_complaints() -> Vec<Complaint> {
    let (complaints, _): (ComplaintStore, UserStore) =
        storage::stable_restore().unwrap_or_default();
    complaints.values().cloned().collect()
}

// ✅ Upvote a complaint safely
#[update]
fn upvote_complaint(complaint_id: String) -> Result<(), String> {
    let (mut complaints, users): (ComplaintStore, UserStore) = match storage::stable_restore() {
        Ok(data) => data,
        Err(_) => return Err("Failed to load storage".to_string()),
    };

    if let Some(complaint) = complaints.get_mut(&complaint_id) {
        complaint.upvotes = Nat::from(complaint.upvotes.clone() + 1);
    } else {
        return Err("Complaint not found".to_string());
    }

    if let Err(err) = storage::stable_save((complaints, users)) {
        return Err(format!("Error saving upvote: {:?}", err));
    }

    Ok(())
}

// ✅ Add a comment safely
#[update]
fn add_comment(complaint_id: String, text: String) -> Result<(), String> {
    let user = caller();
    let (mut complaints, users): (ComplaintStore, UserStore) = match storage::stable_restore() {
        Ok(data) => data,
        Err(_) => return Err("Failed to load storage".to_string()),
    };

    if let Some(complaint) = complaints.get_mut(&complaint_id) {
        complaint.comments.push(Comment { user, text });
    } else {
        return Err("Complaint not found".to_string());
    }

    if let Err(err) = storage::stable_save((complaints, users)) {
        return Err(format!("Error saving comment: {:?}", err));
    }

    Ok(())
}

// ✅ Update complaint status safely
#[update]
fn update_complaint_status(complaint_id: String, new_status: String) -> Result<(), String> {
    let (mut complaints, users): (ComplaintStore, UserStore) = match storage::stable_restore() {
        Ok(data) => data,
        Err(_) => return Err("Failed to load storage".to_string()),
    };

    if let Some(complaint) = complaints.get_mut(&complaint_id) {
        complaint.status = new_status;
    } else {
        return Err("Complaint not found".to_string());
    }

    if let Err(err) = storage::stable_save((complaints, users)) {
        return Err(format!("Error updating status: {:?}", err));
    }

    Ok(())
}
