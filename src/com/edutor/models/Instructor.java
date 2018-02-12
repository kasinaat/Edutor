package com.edutor.models;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

@Entity
@Table(name = "edt_instructor")
@PrimaryKeyJoinColumn(name = "ins_id",referencedColumnName = "profile_id")
public class Instructor extends Profile {

	@Column(name = "ins_rating")
	private Double rating;

	@ManyToMany(cascade = { CascadeType.ALL })
	@JoinTable(name = "ins_course_map", joinColumns = @JoinColumn(name = "ins_id"), inverseJoinColumns = @JoinColumn(name = "course_id"))
	private Set<Course> courses = new HashSet<Course>();

	public Double getRating() {
		return rating;
	}

	public void setRating(Double rating) {
		this.rating = rating;
	}

	public Set<Course> getCourses() {
		return courses;
	}

	public void setCourses(Set<Course> courses) {
		this.courses = courses;
	}


}
