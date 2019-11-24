package controllers

import javax.inject._
import play.api.data.Form
import play.api.data.Forms._
import play.api.data.validation.Constraints._
import play.api.i18n._
import play.api.libs.json.Json
import play.api.mvc._
import scala.concurrent.{ExecutionContext, Future}

import models.{Club, Member}
import repositories.ClubRepository

class ClubController @Inject()(
    clubRepo: ClubRepository,
    cc: MessagesControllerComponents
)(implicit ec: ExecutionContext) extends MessagesAbstractController(cc) {

  case class CreateClubForm(name: String)
  case class CreateMemberForm(name: String, clubId: Int)

  val clubForm: Form[CreateClubForm] = Form {
    mapping(
      "name" -> nonEmptyText
    )(CreateClubForm.apply)(CreateClubForm.unapply)
  }

  val memberForm: Form[CreateMemberForm] = Form {
    mapping(
      "name" -> nonEmptyText,
      "clubId" -> number.verifying(min(0), max(140))
    )(CreateMemberForm.apply)(CreateMemberForm.unapply)
  }

  def addClub = Action.async { implicit request =>

    clubForm.bindFromRequest.fold(
      error => {
        Future.successful(BadRequest("error"))
      },
      club => {
        clubRepo.createClub(club.name).map { _ =>
          Created
        }
      }
    )
  }

  def addMember = Action.async { implicit request =>
    memberForm.bindFromRequest.fold(
      error => {
        Future.successful(BadRequest("error"))
      },
      member => {
        clubRepo.createMember(member.name, member.clubId).map { _ =>
          Created
        }
      }
    )
  }

  def getClubs = Action.async { implicit request =>
    clubRepo.listClubs().map { clubs =>
      Ok(Json.toJson(clubs))
    }
  }

  def getMembers = Action.async { implicit request =>
    clubRepo.listMembers().map { members =>
      Ok(Json.toJson(members))
    }
  }

  def getClubMembers(clubId: Int) = Action.async { implicit request =>
    clubRepo.getClubMembers(clubId).map { members =>
      Ok(Json.toJson(members))
    }
  } 
}