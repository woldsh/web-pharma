<?php
// Database configuration
$host = 'localhost'; // Usually localhost
$username = 'root'; // Your MySQL username
$password = ''; // Your MySQL password
$dbname = 'pharmashop'; // Your database name

// Create connection
$conn = new mysqli($host, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if search form was submitted
if (isset($_POST['search'])) {
    $searchTerm = $conn->real_escape_string($_POST['search']); // Sanitize input
    $sql = "SELECT * FROM drugs WHERE name LIKE '%$searchTerm%'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            echo '<div class="search-result-item">';
            echo '<img src="' . $row['image'] . '" alt="' . $row['name'] . '" style="width:50px; height:50px;">';
            echo '<h3>' . $row['name'] . '</h3>';
            echo '<p>' . $row['price'] . ' ETB</p>';
            echo '</div>';
        }
    } else {
        echo '<p>No drugs found matching your search.</p>';
    }
} else {
    echo '<p>Please enter a search term.</p>';
}

// Close connection
$conn->close();
?>
