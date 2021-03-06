package com.edutor.models;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.TableGenerator;
import javax.persistence.UniqueConstraint;

@Entity
@Table(name = "edt_user_profile", catalog = "edutor_db", uniqueConstraints = @UniqueConstraint(columnNames = {
		"mobile_no" }))
@Inheritance(strategy = InheritanceType.JOINED)
@TableGenerator(name = "profile_gen", table = "id_gen", catalog = "edutor_db", pkColumnName = "id_gen", pkColumnValue = "profile_id", initialValue = 1, allocationSize = 50, valueColumnName = "id_val")
public class Profile {
	@Id
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "profile_gen")
	@Column(name = "profile_id")
	private Integer profileId;

	@Column(name = "first_name")
	private String firstName;

	@Column(name = "last_name")
	private String lastName;

	@Column(name = "mobile_no")
	private Long mobileNo;

	@Column(name = "avatar_url")
	private String avatar;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "user_fk")
	private User user;
	
	@Column(name ="gender")
	@Enumerated(EnumType.STRING)
	private Gender gender = Gender.MALE;
	
	@Column(name = "profile_status")
	@Enumerated(EnumType.STRING)
	private ProfileStatus status = ProfileStatus.COMPLETE;

	@Column(name = "profile_type")
	@Enumerated(EnumType.STRING)
	private ProfileType type = ProfileType.STUDENT;
	
	@Embedded
	@Column(name = "address")
	private Address address;

	public Integer getProfileId() {
		return profileId;
	}

	public void setProfileId(Integer profileId) {
		this.profileId = profileId;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public Long getMobileNo() {
		return mobileNo;
	}

	public void setMobileNo(Long mobileNo) {
		this.mobileNo = mobileNo;
	}

	public String getAvatar() {
		return avatar;
	}

	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}


	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public ProfileStatus getStatus() {
		return status;
	}

	public void setStatus(ProfileStatus status) {
		this.status = status;
	}
}
