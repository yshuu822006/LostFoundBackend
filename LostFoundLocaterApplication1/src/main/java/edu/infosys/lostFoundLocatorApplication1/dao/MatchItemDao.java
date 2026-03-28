package edu.infosys.lostFoundLocatorApplication1.dao;

import java.util.List;
import edu.infosys.lostFoundLocatorApplication1.bean.MatchItem;

public interface MatchItemDao {

    public MatchItem saveMatchItem(MatchItem matchItem);

    public List<MatchItem> getAllMatchItems();
}
