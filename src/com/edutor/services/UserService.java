package com.edutor.services;

import org.hibernate.Session;

import com.edutor.main.HibernateUtil;
import com.edutor.models.Profile;
import com.edutor.models.User;

public class UserService {

	public static boolean login(String username,String password) {
		Session session = HibernateUtil.getSessionFactory().openSession();
		boolean status = false;
		session.beginTransaction();
		User user = session.get(User.class, username);
		if (user != null && user.getPassword().equals(password)){
			status = true;
		}
		session.getTransaction().commit();
		session.close();
		return status;
	}

	public static boolean usernameAvailability(String username) {
		// TODO
		return true;
	}

	public static boolean signup(String emailId, String username, String password) {
		Session session = HibernateUtil.getSessionFactory().openSession();
		session.beginTransaction();
		User user = new User();
		user.setUsername(username);
		user.setEmailId(emailId);
		user.setPassword(password);
		session.save(user);
		session.getTransaction().commit();
		return true;
	}

	public static boolean setProfile(String firstName, String lastName, Long mobile, String street, String city,
			String district, String state, int pincode, String desc) {
		boolean status = false;
		
		return status;
	}
	public static boolean getProfileStatus(String username){
		boolean status = false;
		Session session = HibernateUtil.getSessionFactory().openSession();
		session.beginTransaction();
		Profile profile = new Profile();
		profile = session.get(Profile.class, username);
		if(profile.getStatus().equals("COMPLETE")){
			status = true;
		}
		return status;
	}
}
