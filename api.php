<?php
// api.php
header('Content-Type: application/json');
require_once 'db.php'; // Aquele ficheiro de conexão que fizemos antes

try {
    $stmt = $pdo->query("SELECT * FROM discos ORDER BY id DESC");
    $discos = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($discos);
} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}