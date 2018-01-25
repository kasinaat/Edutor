package com.edutor.models;

import java.util.LinkedList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;
import javax.persistence.TableGenerator;

@Entity
@Table(name = "edt_course", catalog = "edutor_db")
@TableGenerator(name = "course_gen", catalog = "edutor_db", pkColumnName = "id_gen", pkColumnValue = "course_id", initialValue = 1, allocationSize = 50, valueColumnName = "id_val")
public class Course {
	@Id
	@Column(name = "course_id")
	@GeneratedValue(strategy = GenerationType.TABLE)
	private Integer cousrseId;

	@Column(name = "course_title")
	private String courseTitle;

	@Column(name = "course_desc")
	private String description;

	@Column(name = "course_price")
	private Double price;

	@Column(name = "course_rating")
	private Double rating;

	@OneToMany
	@JoinColumn(name = "media_id")
	private List<Media> content = new LinkedList<Media>();

	@ManyToMany(cascade=CascadeType.ALL)
	@JoinTable(name = "course_student_map", joinColumns = @JoinColumn(name = "course_id"), inverseJoinColumns = @JoinColumn(name = "profile_id"))
	private List<Student> students = new LinkedList<Student>();
	
	@OneToOne(cascade = CascadeType.ALL)
	@PrimaryKeyJoinColumn
	private Instructor instructor;

	

	public Instructor getInstructor() {
		return instructor;
	}

	public void setInstructor(Instructor instructor) {
		this.instructor = instructor;
	}


	public Integer getCousrseId() {
		return cousrseId;
	}

	public void setCousrseId(Integer cousrseId) {
		this.cousrseId = cousrseId;
	}

	public String getCourseTitle() {
		return courseTitle;
	}

	public void setCourseTitle(String courseTitle) {
		this.courseTitle = courseTitle;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public Double getRating() {
		return rating;
	}

	public void setRating(Double rating) {
		this.rating = rating;
	}

	public List<Media> getContent() {
		return content;
	}

	public void setContent(List<Media> content) {
		this.content = content;
	}

	public List<Student> getStudents() {
		return students;
	}

	public void setStudents(List<Student> students) {
		this.students = students;
	}
}
