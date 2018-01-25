package com.edutor.models;

import java.util.LinkedList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public class Instructor extends Profile {

	@Column(name = "ins_rating")
	private Double rating;

	@ManyToMany(cascade = { CascadeType.ALL })
	@JoinTable(name = "ins_course_map", joinColumns = @JoinColumn(name = "ins_id"), inverseJoinColumns = @JoinColumn(name = "course_id"))
	private List<Course> courses = new LinkedList<Course>();

	public Double getRating() {
		return rating;
	}

	public void setRating(Double rating) {
		this.rating = rating;
	}

	public List<Course> getCourses() {
		return courses;
	}

	public void setCourses(List<Course> courses) {
		this.courses = courses;
	}
}
