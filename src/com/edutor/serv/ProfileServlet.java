package com.edutor.serv;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.edutor.services.UserService;

@WebServlet("/profile")
public class ProfileServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public ProfileServlet() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String username = request.getParameter("user");
		String email = request.getParameter("email");
		String mobile = request.getParameter("mobile");
		if (username != null) {
			if (UserService.usernameAvailability(username)) {
				response.setStatus(404);
			} else {
				response.setStatus(200);
			}
		} else if(email != null){
			if (UserService.emailAvailability(email)) {
				response.setStatus(404);
			} else {
				response.setStatus(200);
			}
		} else if(mobile != null){
			if (UserService.mobileAvailability(Long.parseLong(mobile))) {
				response.setStatus(404);
			} else {
				response.setStatus(200);
			}
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}

}
