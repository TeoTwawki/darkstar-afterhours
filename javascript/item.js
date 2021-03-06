function loadStartPage() {}

function getItem() {
	var itemid = $("body").data("id");
	var stack = $("body").data("stack");
	$.ajax({
		url: "/getitem.php",
		type: 'get',
		dataType: 'json',
		async: true,
		cache: false,
		data: { id : itemid, stack : stack },
		success: function(jsonData) {
			if (jsonData.itemid == null) {
				return 0;
			} else {
				$(document).prop('title', 'AfterHours - ' + jsonData.realname);
				$(".i_item").html(jsonData.realname);
				$(".i_mainicon").attr("src", "images/large-icons/" + jsonData.itemid + ".png");
				if (jsonData.ex == true && jsonData.rare == true) {
					$(".i_raex").html('<img src="images/icons/g_rare.png" class="i_rare"><img src="images/icons/g_exclusive.png" class="i_ex">');
				} else if (jsonData.ex == true) {
					$(".i_raex").html('<img src="images/icons/g_exclusive.png" class="i_ex">');
				} else if (jsonData.rare == true) {
					$(".i_raex").html('<img src="images/icons/g_rare.png" class="i_rare">');
				}
				if (jsonData.armor == 1) {
					$(".i_jobs").html("Lv"+jsonData.level+" &nbsp; "+jsonData.jobs);
					$(".i_stats").html(jsonData.mods);
				} else {
					$(".i_jobs").html("");
					$(".i_stats").html(jsonData.description);
				}
				$(".item-bgwiki").html("<a href=\"//www.bg-wiki.com/bg/"+jsonData.sortname+"\"><img style=\"vertical-align:text-bottom\" src=\"images/bgwiki.png\"></a>");
				if (jsonData.nosale == 0) {
					$(".item-stock").html(jsonData.instock);
					$(".item-currprice").html(jsonData.price);
					$(".item-ahcat").html("<a class=\"catlink\" data-id=\""+jsonData.ahcatid+"\">"+jsonData.ahcat+"</a>");
					$("#auctions").html("");
					var z = 0;
					$.each(jsonData.ah, function(i, item) {
						var html = "";
						html += "<tr>";
						html += "<td class=\"ah-date\">"+item.date+"</td>";
						html += "<td class=\"ah-who\">"+item.seller+"</td>";
						html += "<td class=\"ah-who\">"+item.buyer+"</td>";
						html += "<td class=\"ah-price\">"+item.price+"</td>";
						html += "</tr>";
						$("#auctions").append(html);
						z = z + 1;
					});
					if (z != 0)
						$("#price_history").html(" ("+z+")");
				} else {
					$(".tbl.tbl-ahcathead").css("display", "none");
					$(".tbl-ah").css("display", "none");
					var $rows = $(".tbl-stats tr");
					$rows.eq(1).hide();
					$rows.eq(2).hide();
				}
			}
		}
	});
}

$(function() {
	getItem();
	setInterval("getItem()", 30000);
});