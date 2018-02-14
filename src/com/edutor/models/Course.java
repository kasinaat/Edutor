package com.edutor.models;

import java.util.Set;
import java.util.TreeSet;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
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
@TableGenerator(name = "course_gen",table="id_gen", catalog = "edutor_db", pkColumnName = "id_gen", pkColumnValue = "course_id", initialValue = 1, allocationSize = 50, valueColumnName = "id_val")
public class Course  {

	@Id
	@Column(name = "course_id")
	@GeneratedValue(strategy = GenerationType.TABLE ,generator = "course_gen")
	private Integer courseId;

	@Column(name = "course_title")
	private String courseTitle;

	@Column(name = "course_desc")
	private String description;

	@Column(name = "course_price")
	private Double price;

	@Column(name = "course_rating")
	private Double rating;
	
	@Column(name="course_thumb")
	private String courseAvatar;

	@OneToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "course_media_id",joinColumns = @JoinColumn(name = "course_id"),inverseJoinColumns = @JoinColumn(name="media_id"))
	private Set<Media> content = new TreeSet<Media>();

	@ManyToMany(cascade=CascadeType.ALL)
	@JoinTable(name = "course_student_map", joinColumns = @JoinColumn(name = "course_id"), inverseJoinColumns = @JoinColumn(name = "student_id"))
	private Set<Student> students = new TreeSet<Student>();
	
	@OneToOne(cascade = CascadeType.ALL)
	@PrimaryKeyJoinColumn(name="course_instructor_map")
	private Instructor instructor;

	

	public Instructor getInstructor() {
		return instructor;
	}

	public void setInstructor(Instructor instructor) {
		this.instructor = instructor;
	}


	public Integer getCourseId() {
		return courseId;
	}

	public void setCourseId(Integer cousrseId) {
		this.courseId = cousrseId;
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


	public String getCourseAvatar() {
		return courseAvatar;
	}

	public void setCourseAvatar(String courseAvatar) {
		this.courseAvatar = courseAvatar;
	}

	public Set<Media> getContent() {
		return content;
	}

	public void setContent(Set<Media> content) {
		this.content = content;
	}

	public Set<Student> getStudents() {
		return students;
	}

	public void setStudents(Set<Student> students) {
		this.students = students;
	}
}
