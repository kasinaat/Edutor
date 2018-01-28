package com.edutor.services;

import org.hibernate.Session;

import com.edutor.main.HibernateUtil;
import com.edutor.models.User;

public class UserService {

	public boolean login(String username ) {
		Session session = HibernateUtil.getSessionFactory().openSession();
		boolean status = false;
		session.beginTransaction();
		User user = session.get(User.class, username);
		if(user != null)
			status = true;
		session.getTransaction().commit();
		session.close();
		return status;
	}

	public boolean usernameAvailability(String username) {
		// TODO
		return true;
	}

	public boolean signup(String emailId, String username, String password) {
		Session session = HibernateUtil.getSessionFactory().openSession();
		session.beginTransaction();
		boolean status = false;
		User user = new User();
		user.setUsername(username);
		user.setEmailId(emailId);
		user.setPassword(password);
		session.save(user);
		session.getTransaction().commit();
		return status;
	}
	
	public boolean addProfile(){
		boolean status = false;
		return status;
	}
}
