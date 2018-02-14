package com.edutor.services;

import java.util.LinkedList;
import java.util.List;
import java.util.Set;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;

import com.edutor.main.HibernateUtil;
import com.edutor.models.Course;
import com.edutor.models.Media;
import com.edutor.models.Profile;
import com.edutor.models.Student;

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
	public static boolean addCourseContent(String courseName, String lessonName, String url) {
		Session session = HibernateUtil.getSessionFactory().openSession();
		session.beginTransaction();
		Criteria cr = session.createCriteria(Course.class);
		cr.add(Restrictions.eq("courseTitle", courseName));
		Course course = (Course) cr.uniqueResult();
		Media media = new Media();
		media.setLessonName(lessonName);
		media.setUrl(url);
		course.getContent().add(media);
		session.save(media);
		session.update(course);
		session.getTransaction().commit();
		session.close();
		return true;
	}
	@SuppressWarnings({ "deprecation", "unchecked" })
	public static List<Course> register(int courseId,String username){
		Session session = HibernateUtil.getSessionFactory().openSession();
		session.beginTransaction();
		Criteria criteria = session.createCriteria(Profile.class);
		criteria.add(Restrictions.eq("user.username", username));
		Profile profile = (Profile)criteria.uniqueResult();
		Course course = session.get(Course.class, courseId);
		Student student = session.get(Student.class, profile.getProfileId());
		student.getCourses().add(course);
		course.getStudents().add(student);
		session.getTransaction().commit();
		session.close();
		Session sessionNew = HibernateUtil.getSessionFactory().openSession();
		sessionNew.beginTransaction();
		Criteria cr = sessionNew.createCriteria(Course.class).add(Restrictions.eq("courseId", courseId))
				.setProjection(Projections.projectionList().add(Projections.property("courseId"), "courseId")
						.add(Projections.property("courseTitle"), "courseTitle")
						.add(Projections.property("description"), "description"));
		List<Course> courses = (List<Course>) cr.list();
		sessionNew.getTransaction().commit();
		sessionNew.close();
		return courses;
	}
	public static Set<Media> getAllCourseContent(int courseId){
		 Session session = HibernateUtil.getSessionFactory().openSession();
		 session.beginTransaction();
		 Course course = session.get(Course.class, courseId);
		 System.out.println(course.getContent());
		 session.getTransaction().commit();
		 session.close();
		 return course.getContent();
	 }
	@SuppressWarnings({ "deprecation" })
	public static List<Course> getCoursesByUsername(String username){
		Session session = HibernateUtil.getSessionFactory().openSession();
		session.beginTransaction();
		Criteria criteria = session.createCriteria(Student.class);
		criteria.add(Restrictions.eq("user.username", username));
		Student student = (Student) criteria.uniqueResult();
		Set<Course> courses = student.getCourses();
		List<Course> result = new LinkedList<Course>();
		for(Course each :courses){
			Course temp = new Course();
			temp.setCourseId(each.getCourseId());
			temp.setCourseTitle(each.getCourseTitle());
			result.add(temp);
		}
		session.getTransaction().commit();
		 session.close();
		return result;
	}
}
