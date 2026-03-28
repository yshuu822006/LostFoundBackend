package edu.infosys.lostFoundLocatorApplication1.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import edu.infosys.lostFoundLocatorApplication1.bean.LostfoundUser;

@Repository
public interface LostfoundUserRepository extends JpaRepository<LostfoundUser,String>{
	@Query("SELECT a FROM LostfoundUser a WHERE a.role = 'student'")
	public List<LostfoundUser> getAllStudents();

}
//run it