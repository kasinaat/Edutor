package com.edutor.models;

import java.util.LinkedList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.TableGenerator;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@TableGenerator(name = "course_gen", catalog = "edutor_db", pkColumnName = "id_gen", pkColumnValue = "profile_id", initialValue = 1, allocationSize = 50, valueColumnName = "id_val")
public class Student extends Profile {

	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable(name = "student_course_map", joinColumns = @JoinColumn(name = "profile_id"), inverseJoinColumns = @JoinColumn(name = "student_id"))
	private List<Course> courses = new LinkedList<Course>();

	public List<Course> getCourses() {
		return courses;
	}

	public void setCourses(List<Course> courses) {
		this.courses = courses;
	}

}
