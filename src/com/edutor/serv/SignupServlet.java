package com.edutor.serv;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.edutor.services.UserService;

@WebServlet("/signup")
public class SignupServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public SignupServlet() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String email = request.getParameter("email");
		String username = request.getParameter("username");
		String password = request.getParameter("pass");
		UserService.signup(email, username, password);
		String firstName = request.getParameter("fname");
		String lastName = request.getParameter("lname");
		Long mobile = Long.parseLong(request.getParameter("phone"));
		String street = request.getParameter("a_street");
		String district = request.getParameter("a_district");
		String  state = request.getParameter("a_state");
		int pincode = Integer.parseInt(request.getParameter("a_pincode"));	
		if (UserService.setProfile(username,firstName, lastName, mobile, street, district, state, pincode) == true) {
			PrintWriter pw = response.getWriter();
			Cookie cookie = new Cookie("currentUser", username);
			response.addCookie(cookie);
			HttpSession session = request.getSession();
			session.setAttribute("username", username);
			response.sendRedirect("dashboard");
			pw.close();
		}

	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request,response);
	}

}
