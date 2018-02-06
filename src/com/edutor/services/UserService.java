package com.edutor.services;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

import com.edutor.main.HibernateUtil;
import com.edutor.models.Address;
import com.edutor.models.Profile;
import com.edutor.models.User;

public class UserService {

	public static boolean login(String username, String password) {
		Session session = HibernateUtil.getSessionFactory().openSession();
		boolean status = false;
		session.beginTransaction();
		User user = session.get(User.class, username);
		if (user != null && user.getPassword().equals(password)) {
			status = true;
		}
		session.getTransaction().commit();
		session.close();
		return status;
	}

	public static boolean usernameAvailability(String username) {
		Session session = HibernateUtil.getSessionFactory().openSession();
		session.beginTransaction();
		@SuppressWarnings("deprecation")
		Criteria cr = session.createCriteria(User.class);
		cr.add(Restrictions.eq("username", username));
		if (cr.list().isEmpty()) {
			session.getTransaction().commit();
			session.close();
			return false;

		} else {
			session.getTransaction().commit();
			session.close();
			return true;
		}
	}
	public static boolean emailAvailability(String email) {
		Session session = HibernateUtil.getSessionFactory().openSession();
		session.beginTransaction();
		@SuppressWarnings("deprecation")
		Criteria cr = session.createCriteria(User.class);
		cr.add(Restrictions.eq("emailId", email));
		if (cr.list().isEmpty()) {
			session.getTransaction().commit();
			session.close();
			return false;

		} else {
			session.getTransaction().commit();
			session.close();
			return true;
		}
	}
	public static boolean mobileAvailability(Long mobile) {
		Session session = HibernateUtil.getSessionFactory().openSession();
		session.beginTransaction();
		@SuppressWarnings("deprecation")
		Criteria cr = session.createCriteria(Profile.class);
		cr.add(Restrictions.eq("mobileNo", mobile));
		if (cr.list().isEmpty()) {
			session.getTransaction().commit();
			session.close();
			return false;

		} else {
			session.getTransaction().commit();
			session.close();
			return true;
		}
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

	public static boolean setProfile(String username, String firstName, String lastName, Long mobile, String street,
			String district, String state, int pincode) {
		boolean status = true;
		Session session = HibernateUtil.getSessionFactory().openSession();
		session.beginTransaction();
		Profile profile = new Profile();
		User user = session.get(User.class, username);
		profile.setUser(user);
		profile.setFirstName(firstName);
		profile.setLastName(lastName);
		profile.setMobileNo(mobile);
		Address address = new Address();
		address.setDistrict(district);
		address.setPincode(pincode);
		address.setStreet(street);
		address.setState(state);
		profile.setAddress(address);
		session.save(profile);
		session.getTransaction().commit();
		session.close();
		return status;
	}

	public static boolean getProfileStatus(String username) {
		boolean status = false;
		Session session = HibernateUtil.getSessionFactory().openSession();
		session.beginTransaction();
		Profile profile = new Profile();
		profile = session.get(Profile.class, username);
		if (profile.getStatus().equals("COMPLETE")) {
			status = true;
		}
		return status;
	}
}
