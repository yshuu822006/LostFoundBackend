package edu.infosys.lostFoundLocatorApplication1.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.infosys.lostFoundLocatorApplication1.bean.MatchItem;
import edu.infosys.lostFoundLocatorApplication1.bean.MatchItemId;

public interface MatchItemRepository extends JpaRepository<MatchItem, MatchItemId> {

}
