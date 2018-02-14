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


@WebServlet("/registercourse")
public class CourseRegister extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

    public CourseRegister() {
        super();
        // TODO Auto-generated constructor stub
    }


	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String courseId = request.getParameter("cid");
		String username = request.getParameter("uname");
		List<Course> course = CourseService.register(Integer.parseInt(courseId), username);
		PrintWriter out = response.getWriter();
		Gson gson = new Gson();
		out.write(gson.toJson(course));
		out.close();
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
