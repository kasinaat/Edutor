package com.edutor.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.TableGenerator;

@Entity
@Table(name = "edt_media", catalog = "edutor_db")
@TableGenerator(name = "media_gen", table = "id_gen", catalog = "edutor_db", pkColumnName = "id_gen", pkColumnValue = "media_id", initialValue = 1, allocationSize = 50, valueColumnName = "id_val")
public class Media {
	@Id
	@Column(name = "media_id")
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "media_gen")
	private Integer mediaId;

	@Column(name = "media_title")
	private String title;

	@Column(name = "media_type")
	private String type;

	@Column(name = "media_desc")
	private String description;

	@Column(name = "media_location")
	private String url;

	@Column(name = "lesson_name")
	private String lessonName;

	public Integer getMediaId() {
		return mediaId;
	}

	public void setMediaId(Integer mediaId) {
		this.mediaId = mediaId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getLessonName() {
		return lessonName;
	}

	public void setLessonName(String lessonName) {
		this.lessonName = lessonName;
	}

}
