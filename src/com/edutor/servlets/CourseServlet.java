package com.edutor.servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.edutor.models.Course;
import com.edutor.services.CourseService;
import com.google.gson.Gson;

@WebServlet("/course")
public class CourseServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public CourseServlet() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String value = request.getParameter("value");
		if (value.equals("addcourse")) {
			String courseName = request.getParameter("name");
			String description = request.getParameter("desc");
			CourseService.addCourseDetails(courseName, description);
		} else if(value.equals("addcontent")){
			String courseName = request.getParameter("name");
			String lessonName = request.getParameter("lname");
			String lessonNumber = request.getParameter("lnum");
			String url = request.getParameter("url");
			CourseService.addCourseContent(courseName, lessonName, lessonNumber, url);
		} else if(value.equals("all")){
			List<Course> courses = CourseService.getAllCourse();
			PrintWriter out = response.getWriter();
			out.write(new Gson().toJson(courses));
			out.close();
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}

}
