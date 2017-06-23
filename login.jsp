<!DOCTYPE html>
<html >
<head>
  <meta charset="UTF-8"/>
  <title>Sign into Jarvis</title>
  <link rel="stylesheet" href="css/style.css"/>
</head>

<body>
	<div class="wrapper">
		<div class="container">
			<h1>Jarvis</h1>
                             
			<form class="form" action="validateuser.jsp" method="post">
				<input type="text" placeholder="Username" name="userName"/>
				<input type="password" placeholder="Password" name="password"/>
				<button type="submit" id="login-button">Login</button>
			</form>
		</div>
	</div>
</body>
</html>
