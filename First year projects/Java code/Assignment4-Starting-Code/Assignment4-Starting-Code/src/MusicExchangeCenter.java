import java.util.ArrayList;
import java.util.HashMap;
import java.util.TreeSet;
import java.text.Collator;

public class MusicExchangeCenter {
    private ArrayList<User> users;
    HashMap<String, Float> royalties = new HashMap<String, Float>();
    ArrayList<Song> downloadedSongs = new ArrayList<Song>();

    public MusicExchangeCenter() {
        users = new ArrayList<User>();
    }

    public ArrayList<User> onlineUsers() { //gets a list of all online users
        ArrayList<User> online = new ArrayList<User>();
        for (int x = 0; x < users.size(); x++) {
            if (users.get(x).isOnline()) {
                online.add(users.get(x));
            }
        }
        return online;
    }

    public ArrayList<Song> allAvailableSongs() { //gets a list of all songs from all online users
        ArrayList<Song> songs = new ArrayList<Song>();
        ArrayList<User> onlineUsers = onlineUsers();
        for (int x = 0; x < onlineUsers.size(); x++) {
            songs.addAll(users.get(x).getSongList());
        }
        return songs;
    }

    public String toString() {
        return "Music Exchange Center (" + onlineUsers().size() + " users on-line, " + allAvailableSongs().size() + " songs available)";
    }

    public User userWithName(String s) { //gets user with a specific name
        for (int x = 0; x < users.size(); x++) {
            if (users.get(x).getUserName().equals(s)) {
                return users.get(x);
            }
        }
        return null;
    }

    public void registerUser(User x) {
        if (userWithName(x.getUserName()) == null) {
            users.add(x);
        }
    }

    public ArrayList<Song> availableSongsByArtist(String artist) { //gets all songs by a specific user
        ArrayList<Song> songs = new ArrayList<Song>();
        User artistUser = userWithName(artist);
        if (artistUser != null) {
            songs.addAll(artistUser.getSongList());
        }
        return songs;
    }

    public Song getSong(String title, String ownerName) { //gets the song of a specific title and owner
        for (User user : onlineUsers()) {
            if (user.getUserName().equals(ownerName)) { //finds user
                for (Song song : user.getSongList()) {
                    if (song.getTitle().equals(title)) { //finds title
                        downloadedSongs.add(song);
                        if (royalties.containsKey(song.getArtist())){   //updates royalties
                            royalties.replace(song.getArtist(),royalties.get(song.getArtist()) + 0.25f);
                        }
                        else{
                            royalties.put(song.getArtist(),0.25f);
                        }
                        return song;
                    }
                }
            }
        }
        return null;
    }

    public void displayRoyalties() {
        System.out.println("AMOUNT  ARTIST");
        System.out.println("--------------");
        for (String i : royalties.keySet()) { //displays all royalties
            System.out.println("$" + String.format("%-7s%-1s", royalties.get(i), i));
        }
    }

    public TreeSet<Song> uniqueDownloads() { //adds all downloaded songs to a treeset, alphabetically sorted
        TreeSet<Song> unique = new TreeSet<Song>();
        unique.addAll(downloadedSongs);
        return unique;
    }

    public ArrayList<Pair<Integer, Song>> songsByPopularity() { //sorts all songs by popularity
        ArrayList<Pair<Integer, Song>> songList = new ArrayList<Pair<Integer, Song>>();
        for (Song song : downloadedSongs) {
            boolean found=false;
            for (Pair<Integer, Song> pair:songList){ //for every song in downloaded songs, increases the number of times
                if (pair.getValue().equals(song)){// it has been downloaded, or adds it to the list if it's not there already
                    pair.setKey(pair.getKey()+1);
                    found=true;
                    break;
                }
            }
            if (!found){
                songList.add(new Pair(1, song));
            }
        }
        for (int y = 0; y < songList.size(); y++) { //bubble sort all the songs by number of times downloaded
            for (int x = 0; x < songList.size() - y - 1; x++) {
                if (songList.get(x).getKey() < songList.get(x + 1).getKey()) {
                    Pair holder = songList.get(x);
                    int holdint = songList.get(x).getKey();
                    Song holdsong = songList.get(x).getValue();
                    songList.get(x).setKey(songList.get(x + 1).getKey());
                    songList.get(x).setValue(songList.get(x + 1).getValue());
                    songList.get(x + 1).setKey(holdint);
                    songList.get(x + 1).setValue(holdsong);
                }
            }
        }
        return songList;
    }

    public ArrayList<Song> getDownloadedSongs(){return downloadedSongs;}
}