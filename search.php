<?php

include 'TwitterSearch.php';

include 'FacebookSearch.php';

include 'phpInsight.php';



$term = 'romney';

if(isset($_REQUEST['term'])) {
			$term = $_REQUEST['term'];
		}

$startdate = 0;
$enddate = 0;

if(isset($_REQUEST['startdate'])) {
			$startdate = $_REQUEST['startdate'];
			$enddate = $_REQUEST['enddate'];
		}


$username= 'root';
$password= 'frubrev5ceruch';
$database= 'twb';
$domain = 'localhost';

$link=mysql_connect($domain,$username,$password);
if (!$link) {
 die('Could not connect: ' . mysql_error());
}
else {
 mysql_select_db($database, $link);
}


$pages = 2;

$sent = new Sentiment();

$sent->startup();

//$search = new TwitterSearch($term);

$results = array(); 

$resultsface = array();

$return = array();

//$today = date("Y-m-d");
//$yes = strftime("%Y-%m-%d", strtotime("-1 days"));


for ($n=$startdate; $n>=$enddate; $n--)
{
$results = array(); 

$resultsface = array();


	for ($m=1; $m<$pages; $m++)
	  {
	   $search = new TwitterSearch($term);
	    $resultstemp = $search->page($m);
		if ($n!=0) {
				$resultstemp = $search->until(strftime("%Y-%m-%d", strtotime($n+1 . " days")));    //('2012-03-05');			
			}
		$resultstemp = $search->rpp(20)->results();
		//echo $resultstemp->
		$results = array_merge((array) $results, (array) $resultstemp);
		
	  }


	   $searchface = new FacebookSearch($term);
		if ($n!=0) {
				$resultstemp2 = $searchface->until(strftime("%Y-%m-%d", strtotime($n+1 . " days")));    //('2012-03-05');			
			}
		$resultstemp2 = $searchface->results();
		$resultsface = array_merge( (array) $resultsface, (array) $resultstemp2);
	
	
$tempstr = "";
$t = 0; 
$f = 0;
$j = 0;

for ($i=0; $i<count($results); $i++) {
      			$tempstr = $sent->categorise($results[$i]->text, 0);
      			if ($tempstr == 'neg') {
                        $t++; 
                } else if ($tempstr == 'pos') {
                		$f++;
                } else {
                        $j++;
                }
        }

for ($i=0; $i<count($resultsface); $i++) {
      			$tempstr = $sent->categorise($resultsface[$i]->message, 0);
      			if ($tempstr == 'neg') {
                        $t++;
                } else if ($tempstr == 'pos') {
                		$f++;
                } else {
                        $j++;
                }
        }

       


 $return[] = array(
          'day'=> $n,
          'neg' => $t,
          'pos'   => $f,
          'total'   => (count($results) + count($resultsface))
          );

}

$wcArray = array();


$posArr = array();
$posArrCount = array();
$wcArray = array_count_values($sent->getpWords());
foreach ($wcArray as $key => $value) {
    $posArr[] = $key;
    $posArrCount[] = $value;
}


$negArr = array();
$negArrCount = array();
$wcArray = array_count_values($sent->getnWords());
foreach ($wcArray as $key => $value) {
    $negArr[] = $key;
    $negArrCount[] = $value;
}

      
 $returnfull = array();
 $returnfull['obj'] = array(
          'days' => $return, 
          'posWords' => $posArr,
          'posWordsCount' => $posArrCount,
          'negWords' => $negArr,
          'negWordsCount' => $negArrCount
      );
 
 
 
echo json_encode($returnfull);

?>


