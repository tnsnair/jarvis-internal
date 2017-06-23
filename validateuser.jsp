<html>
<head><body>


<%
String userName = request.getParameter("userName");
String password = request.getParameter("password");

if(userName.equals("user") && password.equals("pass")){
	session.setAttribute("user", userName);
	response.sendRedirect("home.jsp");
} else {
	response.sendRedirect("login.jsp");
}

%>
</body>
</head>
</html>