package models

import play.api.libs.json._

case class Member(id: Int, name: String, clubId: Int)

object Member {  
  implicit val memberFormat = Json.format[Member]
}