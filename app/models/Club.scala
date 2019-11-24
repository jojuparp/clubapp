package models

import play.api.libs.json._

case class Club(id: Int, name: String)

object Club {  
  implicit val clubFormat = Json.format[Club]
}
