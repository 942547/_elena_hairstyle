<?php

	$start_count_posts   = 7;
	$loading_count_posts = 10;
	$path = "jscroll.php";

	$text = "Равным образом постоянное информационно-пропагандистское обеспечение нашей деятельности способствует подготовки и реализации систем массового участия. Разнообразный и богатый опыт постоянный количественный рост и сфера нашей активности требуют определения и уточнения новых предложений. Разнообразный и богатый опыт начало повседневной работы по формированию позиции играет важную роль в формировании существенных финансовых и административных условий. Не следует, однако забывать, что рамки и место обучения кадров позволяет оценить значение позиций, занимаемых участниками в отношении поставленных задач. Товарищи! начало повседневной работы по формированию позиции требуют от нас анализа направлений прогрессивного развития.";

	function is_ajax(){

		if(isset($_SERVER["HTTP_X_REQUESTED_WITH"]) &&
		   !empty($_SERVER["HTTP_X_REQUESTED_WITH"]) &&
		   strtolower($_SERVER["HTTP_X_REQUESTED_WITH"]) == "xmlhttprequest"){

			return true;
		}

		return false;
	}

	function is_get(){

		if($_SERVER["REQUEST_METHOD"] == "GET"){

			return true;
		}

		return false;
	}

	function template_post($num, $text){

		if($num && $text){

			$html .= "

				<p>
					<span>".$num."</span>
					<span>
						".$text."
					</span>
				</p>
			";

			return $html;
		}

		return false;
	}

	## Обработка запросов
	if(is_get() && is_ajax()){

		## Подгрузка первых записей
		if(isset($_GET["type"]) && $_GET["type"] === "start"){
			sleep(1);

			for($i = 0; $i <= $start_count_posts; $i++){ 

				$posts .= template_post($i, $text);
			}

			$posts .= "

				<div class='next'>
					<a href='".$path."?count=".$loading_count_posts."'>next</a>
				</div>
			";

			echo(json_encode($posts));
		}

		## Подгрузка записей
		if(isset($_GET["count"])){

			$count = (int) $_GET["count"];

			if ($count == 50){
				
				exit;
			}

			sleep(1);

			for($i = $count + 1; $i <= $count + $loading_count_posts; $i++){

				$posts .= template_post($i, $text);
			}

			$count += $loading_count_posts;

			$posts .= "

				<div class='next'>
					<a href='".$path."?count=".$count."'>next</a>
				</div>
			";

			echo($posts);
		}
	}

	exit;
?>