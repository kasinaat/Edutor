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

@WebServlet("/login")
public class LoginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public LoginServlet() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		response.setContentType("text/html");
		if (UserService.login(username, password) == true) {
			PrintWriter pw = response.getWriter();
			Cookie cookie = new Cookie("currentUser", username);
			response.addCookie(cookie);
			HttpSession session = request.getSession();
			session.setAttribute("username", username);
			if (username.equals("admin")) {
				response.sendRedirect("admin.html");
			} else {
				response.sendRedirect("dashboard.html");
			}
			pw.close();
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}

}
