package repositories

import javax.inject.{ Inject, Singleton }
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile
import scala.concurrent.{ Future, ExecutionContext }

import models.{Club, Member}

@Singleton
class ClubRepository @Inject()(
    dbConfigProvider: DatabaseConfigProvider
)(implicit ec: ExecutionContext) {

  private val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._

  private class ClubsTable(tag: Tag) extends Table[Club](tag, "clubs") {

    def id = column[Int]("id", O.PrimaryKey, O.AutoInc)
    def name = column[String]("name")

    def * = (id, name) <> ((Club.apply _).tupled, Club.unapply)
    
  }

  private class MemebersTable(tag: Tag) extends Table[Member](tag, "members") {

    def id = column[Int]("id", O.PrimaryKey, O.AutoInc)
    def name = column[String]("name")
    def clubId = column[Int]("clubId")

    def * = (id, name, clubId) <> ((Member.apply _).tupled, Member.unapply)
  }

  private val clubs = TableQuery[ClubsTable]
  private val members = TableQuery[MemebersTable]

  def createClub(name: String): Future[Club] = db.run {
    (clubs.map(p => (p.name))
      returning clubs.map(_.id)
      into ((name, id) => Club(id, name))
    ) += (name)
  }

  def createMember(name: String, clubId: Int): Future[Member] = db.run {
    (members.map(m => (m.name, m.clubId))
      returning members.map(_.id)
      into ((nameAndClubId, id) => Member(id, nameAndClubId._1, nameAndClubId._2))
    ) += (name, clubId)
  }

  def listClubs(): Future[Seq[Club]] = db.run {
    clubs.result
  }

  def listMembers(): Future[Seq[Member]] = db.run {
    members.result
  }

  def getClubMembers(clubId: Int): Future[Seq[String]] = db.run {
    members.flatMap(m =>
      clubs.filter(c => m.clubId === clubId)
      .map(c => (m.name))
    ).distinct.result
  }
}

