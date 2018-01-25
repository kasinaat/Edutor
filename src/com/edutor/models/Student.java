package com.edutor.models;

import java.util.LinkedList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.ManyToMany;
import javax.persistence.TableGenerator;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@TableGenerator(name = "course_gen", catalog = "edutor_db", pkColumnName = "id_gen", pkColumnValue = "student_id", initialValue = 1, allocationSize = 50, valueColumnName = "id_val")
public class Student extends Profile {
	@Id
	@Column(name = "student_id")
	@GeneratedValue(strategy = GenerationType.TABLE)
	private Integer studentId;

	@ManyToMany(mappedBy = "students")
	private List<Course> courses = new LinkedList<Course>();

	public Integer getStudentId() {
		return studentId;
	}

	public void setStudentId(Integer studentId) {
		this.studentId = studentId;
	}

	public List<Course> getCourses() {
		return courses;
	}

	public void setCourses(List<Course> courses) {
		this.courses = courses;
	}

}
