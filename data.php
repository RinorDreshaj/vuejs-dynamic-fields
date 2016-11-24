<?php
	$t = [
		["name" => "Color","required" => true,"type" => "SINGLE_CHOICE","values" => [["name" => "Red","price" => 19.95],["name" => "Green","price" => 19.95]]],
		["name" => "Size","required" => false,"type" => "MULTPLE_CHOICE","values" => [["name" => "Small","price" => 0.00],["name" => "Medium","price" => 5.00]]]
	];


	print_r( json_encode( $t ) );