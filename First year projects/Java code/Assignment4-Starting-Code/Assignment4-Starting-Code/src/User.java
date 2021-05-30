import java.util.ArrayList;

public class User {
  private String     userName;
  private boolean    online;
  private ArrayList<Song> songList; //list of all the user's songs

  public User()  { this(""); }
  
  public User(String u)  {
    userName = u;
    online = false;
    songList = new ArrayList<Song>();
  }
  
  public String getUserName() { return userName; }
  public boolean isOnline() { return online; }
  public ArrayList<Song> getSongList() {return songList;}
  
  public String toString()  {
    String s = "" + userName + ": "+songList.size()+" songs (";
    if (!online) s += "not ";
    return s + "online)";
  }

  public void addSong(Song s){ //adds a given song to the song list
    songList.add(s);
    s.setOwner(this);
  }

  public int totalSongTime(){ //gets the total time to play all the songs in th songlist
    int totalTime=0;
    for (int x=0;x<songList.size();x++){
      totalTime+=songList.get(x).getDuration();
    }
    return totalTime;
  }

  public void register(MusicExchangeCenter m){
    m.registerUser(this);
  }

  public ArrayList<String> requestCompleteSonglist(MusicExchangeCenter m){ //formats a list of songs
    ArrayList<String> songNames=new ArrayList<String>();
    songNames.add("TITLE                       ARTIST          TIME   OWNER");
    ArrayList<Song> songs=m.allAvailableSongs(); //gets all the songs that are available
    int x=1; //counter for left side of list
    for (Song song:songs){ //stupid long string format statement
      songNames.add(x+". "+String.format("%-25s%-15s%2d%-1s%02d%-1s%-15s",song.getTitle(),song.getArtist(),song.getMinutes(),":",song.getSeconds(),"   ",song.getOwner()));      x+=1;
    }
    return songNames;
  }

  public ArrayList<String> requestSonglistByArtist(MusicExchangeCenter m, String artist){ //gets a formatted list of all the songs by one artist
    ArrayList<String> songNames=new ArrayList<String>();
    songNames.add("TITLE                       ARTIST          TIME   OWNER"); //top of list
    ArrayList<Song> allSongs = m.allAvailableSongs();
    int x=1;
    for (Song song:allSongs){
      if (song.getArtist().equals(artist)){ //if the song is by this artist, add it to the list
        songNames.add(x+". "+String.format("%-25s%-15s%2d%-1s%02d%-1s%-15s",song.getTitle(),song.getArtist(),song.getMinutes(),":",song.getSeconds(),"   ",song.getOwner()));
        x+=1;
      }
    }
    return songNames;
  }

  public void logon(){
    this.online=true;
  }

  public void logoff(){
    this.online=false;
  }

  public void downloadSong(MusicExchangeCenter m, String title, String ownerName){ //simulates downloading a song
    Song song = m.getSong(title, ownerName);
    if (song!=null){
      songList.add(song);
    }
  }
}