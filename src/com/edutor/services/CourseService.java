package com.edutor.services;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;

import com.edutor.main.HibernateUtil;
import com.edutor.models.Course;
import com.edutor.models.Media;

public class CourseService {
	public static List<Course> getCourseByUserName(String username) {
		return null;
	}

	@SuppressWarnings({ "deprecation", "unchecked" })
	public static List<Course> getAllCourse() {
		List<Course> courses = null;
		Session session = HibernateUtil.getSessionFactory().openSession();
		session.beginTransaction();
		Criteria cr = session.createCriteria(Course.class)
				.setProjection(Projections.projectionList().add(Projections.property("courseId"), "courseId")
						.add(Projections.property("courseTitle"), "courseTitle")
						.add(Projections.property("courseAvatar"), "courseAvatar")
						.add(Projections.property("description"), "description"));
		courses = cr.list();
		session.getTransaction().commit();
		session.close();
		return courses;
	}

	public static boolean addCourseDetails(String name, String description) {
		Session session = HibernateUtil.getSessionFactory().openSession();
		session.beginTransaction();
		Course course = new Course();
		course.setCourseTitle(name);
		course.setDescription(description);
		session.save(course);
		session.getTransaction().commit();
		session.close();
		return true;
	}

	@SuppressWarnings("deprecation")
	public static boolean addCourseContent(String courseName, String lessonName, String lessonNumber, String url) {
		Session session = HibernateUtil.getSessionFactory().openSession();
		session.beginTransaction();
		Criteria cr = session.createCriteria(Course.class);
		cr.add(Restrictions.eq("courseTitle", courseName));
		Course course = (Course) cr.uniqueResult();
		Media media = new Media();
		media.setLessonName(lessonName);
		media.setUrl(url);
		media.setVideoNumber(Integer.parseInt(lessonNumber));
		course.getContent().add(media);
		session.save(media);
		session.update(course);
		session.getTransaction().commit();
		session.close();
		return true;
	}
}
