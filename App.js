import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  TextInput,
  StatusBar,
  Dimensions,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const FEATURED_WIDTH = width * 0.78;
const FEATURED_HEIGHT = 220;

// ================= DATA =================

const DESTINATIONS = [
  {
    id: '1',
    name: 'Bali',
    location: 'Bali, Indonesia',
    price: 'Rp 2.500.000',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
    description:
      'Bali adalah surga tropis yang terkenal dengan sawah bertingkat, pantai berpasir putih, dan budaya Hindu yang kaya. Nikmati sunset di Tanah Lot, snorkeling di Nusa Penida, atau sekadar bersantai di Seminyak.',
    rating: '4.9',
    duration: '5 Hari',
    tag: 'Populer',
  },
  {
    id: '2',
    name: 'Raja Ampat',
    location: 'Papua Barat, Indonesia',
    price: 'Rp 4.200.000',
    image: 'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?w=800',
    description:
      'Raja Ampat adalah kepulauan dengan keanekaragaman hayati laut tertinggi di dunia. Cocok untuk snorkeling dan diving kelas dunia di antara pulau-pulau karst yang menakjubkan.',
    rating: '5.0',
    duration: '7 Hari',
    tag: 'Top Rated',
  },
  {
    id: '3',
    name: 'Labuan Bajo',
    location: 'Nusa Tenggara Timur, Indonesia',
    price: 'Rp 3.100.000',
    image: 'https://images.unsplash.com/photo-1590377427719-23f0e8a3dc3c?w=800',
    description:
      'Pintu gerbang menuju Taman Nasional Komodo. Saksikan komodo di habitat aslinya, jelajahi pulau-pulau eksotis, dan nikmati pemandangan bawah laut yang luar biasa.',
    rating: '4.8',
    duration: '4 Hari',
    tag: 'Trending',
  },
  {
    id: '4',
    name: 'Yogyakarta',
    location: 'DI Yogyakarta, Indonesia',
    price: 'Rp 1.200.000',
    image: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=800',
    description:
      'Kota budaya yang kaya sejarah. Kunjungi Candi Borobudur, Prambanan, Keraton Yogyakarta, dan nikmati kuliner khas Jawa seperti gudeg dan bakpia.',
    rating: '4.7',
    duration: '3 Hari',
    tag: 'Budaya',
  },
  {
    id: '5',
    name: 'Danau Toba',
    location: 'Sumatera Utara, Indonesia',
    price: 'Rp 1.800.000',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    description:
      'Danau vulkanik terbesar di dunia yang memukau. Kunjungi Pulau Samosir di tengah danau, rasakan budaya Batak yang autentik, dan nikmati udara pegunungan yang sejuk.',
    rating: '4.6',
    duration: '3 Hari',
    tag: 'Alam',
  },
  {
    id: '6',
    name: 'Lombok',
    location: 'Nusa Tenggara Barat, Indonesia',
    price: 'Rp 2.000.000',
    image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800',
    description:
      'Surga tersembunyi di sebelah timur Bali. Pendaki bisa menaklukkan Gunung Rinjani, sementara pecinta pantai bisa menikmati keindahan Gili Islands yang eksotis.',
    rating: '4.8',
    duration: '4 Hari',
    tag: 'Hidden Gem',
  },
  {
    id: '7',
    name: 'Bromo',
    location: 'Jawa Timur, Indonesia',
    price: 'Rp 1.500.000',
    image: 'https://images.unsplash.com/photo-1570135460919-ab69a24f64c7?w=800',
    description:
      'Gunung berapi aktif yang ikonik dengan lautan pasir yang luas. Saksikan sunrise spektakuler dari Penanjakan, trekking ke kawah Bromo, dan nikmati pemandangan savana.',
    rating: '4.7',
    duration: '2 Hari',
    tag: 'Petualangan',
  },
  {
    id: '8',
    name: 'Wakatobi',
    location: 'Sulawesi Tenggara, Indonesia',
    price: 'Rp 3.800.000',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
    description:
      'Taman Nasional Wakatobi adalah surga bawah laut dengan terumbu karang yang masih sangat alami. Salah satu destinasi diving terbaik di dunia dengan visibilitas air yang luar biasa jernih.',
    rating: '4.9',
    duration: '5 Hari',
    tag: 'Diving',
  },
];

const FEATURED = DESTINATIONS.slice(0, 4);
const ALL = DESTINATIONS;

// ================= CONTEXT =================

const FavoritesContext = React.createContext();

// ================= HOME SCREEN =================

function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={s.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={s.header}>
          <View>
            <Text style={s.headerSub}>Selamat datang 👋</Text>
            <Text style={s.headerTitle}>Explore Indonesia</Text>
          </View>
          <View style={s.avatarCircle}>
            <Ionicons name="person" size={20} color="#00b894" />
          </View>
        </View>

        {/* Search hint */}
        <TouchableOpacity
          style={s.searchHint}
          activeOpacity={0.7}
          onPress={() => navigation.getParent()?.navigate('Search')}
        >
          <Ionicons name="search-outline" size={16} color="#aaa" />
          <Text style={s.searchHintText}>Cari destinasi...</Text>
        </TouchableOpacity>

        {/* Featured horizontal scroll */}
        <View style={s.sectionHeader}>
          <Text style={s.sectionTitle}>✨ Unggulan</Text>
          <Text style={s.sectionSub}>Pilihan terbaik untukmu</Text>
        </View>

        <FlatList
          data={FEATURED}
          keyExtractor={(item) => 'f' + item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={s.featuredList}
          snapToInterval={FEATURED_WIDTH + 14}
          decelerationRate="fast"
          renderItem={({ item }) => (
            <TouchableOpacity
              style={s.featuredCard}
              activeOpacity={0.9}
              onPress={() => navigation.navigate('Detail', { destination: item })}
            >
              <Image source={{ uri: item.image }} style={s.featuredImage} />
              <View style={s.featuredOverlay} />
              <View style={s.featuredTag}>
                <Text style={s.featuredTagText}>{item.tag}</Text>
              </View>
              <View style={s.featuredInfo}>
                <Text style={s.featuredName}>{item.name}</Text>
                <View style={s.featuredRow}>
                  <Ionicons name="location-outline" size={12} color="#ddd" />
                  <Text style={s.featuredLoc}>{item.location}</Text>
                </View>
                <View style={s.featuredBottom}>
                  <Text style={s.featuredPrice}>{item.price}</Text>
                  <View style={s.ratingPill}>
                    <Ionicons name="star" size={10} color="#FFD700" />
                    <Text style={s.ratingText}>{item.rating}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />

        {/* All destinations list */}
        <View style={[s.sectionHeader, { marginTop: 8 }]}>
          <Text style={s.sectionTitle}>🗺️ Semua Destinasi</Text>
          <Text style={s.sectionSub}>{ALL.length} tempat menakjubkan</Text>
        </View>

        {ALL.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={s.listCard}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('Detail', { destination: item })}
          >
            <Image source={{ uri: item.image }} style={s.listImage} />
            <View style={s.listInfo}>
              <View style={s.listTagRow}>
                <View style={s.listTagPill}>
                  <Text style={s.listTagText}>{item.tag}</Text>
                </View>
              </View>
              <Text style={s.listName}>{item.name}</Text>
              <View style={s.listRow}>
                <Ionicons name="location-outline" size={12} color="#aaa" />
                <Text style={s.listLoc}>{item.location}</Text>
              </View>
              <View style={s.listBottom}>
                <Text style={s.listPrice}>{item.price}</Text>
                <View style={s.listDuration}>
                  <Ionicons name="time-outline" size={11} color="#00b894" />
                  <Text style={s.listDurText}>{item.duration}</Text>
                </View>
              </View>
            </View>
            <View style={s.listRating}>
              <Ionicons name="star" size={12} color="#FFD700" />
              <Text style={s.listRatingText}>{item.rating}</Text>
            </View>
          </TouchableOpacity>
        ))}

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ================= DETAIL SCREEN =================

function DetailScreen({ route, navigation }) {
  const { destination } = route.params;
  const { addFavorite, removeFavorite, isFavorite } = React.useContext(FavoritesContext);
  const favorited = isFavorite(destination.id);

  const toggle = () => {
    favorited ? removeFavorite(destination.id) : addFavorite(destination);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={s.heroWrap}>
          <Image source={{ uri: destination.image }} style={s.heroImg} />
          <View style={s.heroGradient} />
          <TouchableOpacity style={s.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={20} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={s.favIconBtn} onPress={toggle}>
            <Ionicons
              name={favorited ? 'heart' : 'heart-outline'}
              size={20}
              color={favorited ? '#ff6b6b' : '#333'}
            />
          </TouchableOpacity>
        </View>

        {/* Content card */}
        <View style={s.detailCard}>
          {/* Tag + name */}
          <View style={s.detailTagRow}>
            <View style={s.detailTagPill}>
              <Text style={s.detailTagText}>{destination.tag}</Text>
            </View>
            <View style={s.ratingPill}>
              <Ionicons name="star" size={11} color="#FFD700" />
              <Text style={s.ratingText}>{destination.rating}</Text>
            </View>
          </View>
          <Text style={s.detailName}>{destination.name}</Text>
          <View style={s.detailLocRow}>
            <Ionicons name="location" size={14} color="#00b894" />
            <Text style={s.detailLoc}>{destination.location}</Text>
          </View>

          {/* Stats */}
          <View style={s.statsRow}>
            <View style={s.statItem}>
              <View style={s.statIcon}>
                <Ionicons name="time-outline" size={18} color="#00b894" />
              </View>
              <Text style={s.statVal}>{destination.duration}</Text>
              <Text style={s.statLbl}>Durasi</Text>
            </View>
            <View style={s.statDivider} />
            <View style={s.statItem}>
              <View style={s.statIcon}>
                <Ionicons name="wallet-outline" size={18} color="#00b894" />
              </View>
              <Text style={[s.statVal, { fontSize: 11 }]}>{destination.price}</Text>
              <Text style={s.statLbl}>Harga</Text>
            </View>
            <View style={s.statDivider} />
            <View style={s.statItem}>
              <View style={s.statIcon}>
                <Ionicons name="star-outline" size={18} color="#00b894" />
              </View>
              <Text style={s.statVal}>{destination.rating}</Text>
              <Text style={s.statLbl}>Rating</Text>
            </View>
          </View>

          {/* Divider */}
          <View style={s.divider} />

          {/* Description */}
          <Text style={s.descTitle}>Tentang Destinasi</Text>
          <Text style={s.descText}>{destination.description}</Text>

          {/* CTA Button */}
          <TouchableOpacity style={[s.ctaBtn, favorited && s.ctaBtnActive]} onPress={toggle}>
            <Ionicons
              name={favorited ? 'heart-dislike-outline' : 'heart-outline'}
              size={18}
              color="#fff"
              style={{ marginRight: 8 }}
            />
            <Text style={s.ctaBtnText}>
              {favorited ? 'Hapus dari Favorit' : 'Simpan ke Favorit'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

// ================= SEARCH SCREEN =================

function SearchScreen({ navigation }) {
  const [query, setQuery] = React.useState('');

  const filtered = DESTINATIONS.filter(
    (item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.location.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <SafeAreaView style={s.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={s.header}>
        <View>
          <Text style={s.headerSub}>Temukan tempat</Text>
          <Text style={s.headerTitle}>Cari Destinasi</Text>
        </View>
        <Ionicons name="compass-outline" size={28} color="#00b894" />
      </View>

      <View style={s.searchBox}>
        <Ionicons name="search-outline" size={18} color="#aaa" style={{ marginRight: 8 }} />
        <TextInput
          style={s.searchInput}
          placeholder="Nama atau lokasi..."
          placeholderTextColor="#bbb"
          value={query}
          onChangeText={setQuery}
          autoCapitalize="none"
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery('')}>
            <Ionicons name="close-circle" size={18} color="#ccc" />
          </TouchableOpacity>
        )}
      </View>

      {query.length > 0 && (
        <Text style={s.resultCount}>{filtered.length} hasil ditemukan</Text>
      )}

      {filtered.length === 0 ? (
        <View style={s.emptyWrap}>
          <Ionicons name="search-outline" size={56} color="#e0e0e0" />
          <Text style={s.emptyTitle}>Tidak ditemukan</Text>
          <Text style={s.emptySub}>Coba kata kunci lain</Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={s.listCard}
              activeOpacity={0.85}
              onPress={() => navigation.navigate('SearchDetail', { destination: item })}
            >
              <Image source={{ uri: item.image }} style={s.listImage} />
              <View style={s.listInfo}>
                <View style={s.listTagRow}>
                  <View style={s.listTagPill}>
                    <Text style={s.listTagText}>{item.tag}</Text>
                  </View>
                </View>
                <Text style={s.listName}>{item.name}</Text>
                <View style={s.listRow}>
                  <Ionicons name="location-outline" size={12} color="#aaa" />
                  <Text style={s.listLoc}>{item.location}</Text>
                </View>
                <View style={s.listBottom}>
                  <Text style={s.listPrice}>{item.price}</Text>
                  <View style={s.listDuration}>
                    <Ionicons name="time-outline" size={11} color="#00b894" />
                    <Text style={s.listDurText}>{item.duration}</Text>
                  </View>
                </View>
              </View>
              <View style={s.listRating}>
                <Ionicons name="star" size={12} color="#FFD700" />
                <Text style={s.listRatingText}>{item.rating}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
}

// ================= FAVORITES SCREEN =================

function FavoritesScreen({ navigation }) {
  const { favorites } = React.useContext(FavoritesContext);

  return (
    <SafeAreaView style={s.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={s.header}>
        <View>
          <Text style={s.headerSub}>Tersimpan</Text>
          <Text style={s.headerTitle}>Favorit Saya</Text>
        </View>
        <View style={s.favCountBadge}>
          <Text style={s.favCountText}>{favorites.length}</Text>
        </View>
      </View>

      {favorites.length === 0 ? (
        <View style={s.emptyWrap}>
          <Ionicons name="heart-outline" size={56} color="#e0e0e0" />
          <Text style={s.emptyTitle}>Belum ada favorit</Text>
          <Text style={s.emptySub}>Tap ikon ❤️ di halaman detail</Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={s.listCard}
              activeOpacity={0.85}
              onPress={() => navigation.navigate('FavDetail', { destination: item })}
            >
              <Image source={{ uri: item.image }} style={s.listImage} />
              <View style={s.listInfo}>
                <View style={s.listTagRow}>
                  <View style={s.listTagPill}>
                    <Text style={s.listTagText}>{item.tag}</Text>
                  </View>
                </View>
                <Text style={s.listName}>{item.name}</Text>
                <View style={s.listRow}>
                  <Ionicons name="location-outline" size={12} color="#aaa" />
                  <Text style={s.listLoc}>{item.location}</Text>
                </View>
                <View style={s.listBottom}>
                  <Text style={s.listPrice}>{item.price}</Text>
                  <View style={s.listDuration}>
                    <Ionicons name="time-outline" size={11} color="#00b894" />
                    <Text style={s.listDurText}>{item.duration}</Text>
                  </View>
                </View>
              </View>
              <View style={s.listRating}>
                <Ionicons name="star" size={12} color="#FFD700" />
                <Text style={s.listRatingText}>{item.rating}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
}

// ================= NAVIGATORS =================

const HomeStack = createNativeStackNavigator();
function HomeStackNav() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeMain" component={HomeScreen} />
      <HomeStack.Screen name="Detail" component={DetailScreen} />
    </HomeStack.Navigator>
  );
}

const SearchStack = createNativeStackNavigator();
function SearchStackNav() {
  return (
    <SearchStack.Navigator screenOptions={{ headerShown: false }}>
      <SearchStack.Screen name="SearchMain" component={SearchScreen} />
      <SearchStack.Screen name="SearchDetail" component={DetailScreen} />
    </SearchStack.Navigator>
  );
}

const FavStack = createNativeStackNavigator();
function FavStackNav() {
  return (
    <FavStack.Navigator screenOptions={{ headerShown: false }}>
      <FavStack.Screen name="FavMain" component={FavoritesScreen} />
      <FavStack.Screen name="FavDetail" component={DetailScreen} />
    </FavStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  const [favorites, setFavorites] = React.useState([]);

  const addFavorite = (d) => {
    setFavorites((prev) => (prev.find((x) => x.id === d.id) ? prev : [...prev, d]));
  };
  const removeFavorite = (id) => setFavorites((prev) => prev.filter((x) => x.id !== id));
  const isFavorite = (id) => favorites.some((x) => x.id === id);

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: '#00b894',
            tabBarInactiveTintColor: '#c0c0c0',
            tabBarStyle: s.tabBar,
            tabBarLabelStyle: s.tabLabel,
            tabBarIcon: ({ focused, color, size }) => {
              const icons = {
                Home: focused ? 'home' : 'home-outline',
                Search: focused ? 'search' : 'search-outline',
                Favorites: focused ? 'heart' : 'heart-outline',
              };
              return <Ionicons name={icons[route.name]} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeStackNav} options={{ title: 'Beranda' }} />
          <Tab.Screen name="Search" component={SearchStackNav} options={{ title: 'Cari' }} />
          <Tab.Screen
            name="Favorites"
            component={FavStackNav}
            options={{
              title: 'Favorit',
              tabBarBadge: favorites.length > 0 ? favorites.length : undefined,
              tabBarBadgeStyle: { backgroundColor: '#ff6b6b', fontSize: 10 },
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </FavoritesContext.Provider>
  );
}

// ================= STYLES =================

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },

  // HEADER
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 14,
    backgroundColor: '#fff',
  },
  headerSub: { fontSize: 13, color: '#aaa', fontWeight: '500' },
  headerTitle: { fontSize: 24, fontWeight: '800', color: '#111', letterSpacing: -0.5, marginTop: 2 },
  avatarCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#e8f8f3',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // SEARCH HINT
  searchHint: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 8,
  },
  searchHintText: { color: '#bbb', fontSize: 14 },

  // SECTION
  sectionHeader: { paddingHorizontal: 20, marginBottom: 12 },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: '#111' },
  sectionSub: { fontSize: 12, color: '#aaa', marginTop: 2 },

  // FEATURED CARD
  featuredList: { paddingLeft: 20, paddingRight: 6, paddingBottom: 4 },
  featuredCard: {
    width: FEATURED_WIDTH,
    height: FEATURED_HEIGHT,
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 14,
    backgroundColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 6,
  },
  featuredImage: { width: '100%', height: '100%', position: 'absolute' },
  featuredOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.32)',
  },
  featuredTag: {
    position: 'absolute',
    top: 14,
    left: 14,
    backgroundColor: '#00b894',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  featuredTagText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  featuredInfo: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16 },
  featuredName: { color: '#fff', fontSize: 22, fontWeight: '800', letterSpacing: -0.4 },
  featuredRow: { flexDirection: 'row', alignItems: 'center', marginTop: 3, gap: 3 },
  featuredLoc: { color: '#ddd', fontSize: 12 },
  featuredBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  featuredPrice: { color: '#fff', fontSize: 14, fontWeight: '700' },

  // RATING PILL
  ratingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 3,
    gap: 3,
  },
  ratingText: { color: '#fff', fontSize: 11, fontWeight: '700' },

  // LIST CARD
  listCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  listImage: { width: 100, height: 100 },
  listInfo: { flex: 1, padding: 12, justifyContent: 'center' },
  listTagRow: { marginBottom: 4 },
  listTagPill: {
    alignSelf: 'flex-start',
    backgroundColor: '#e8f8f3',
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  listTagText: { color: '#00b894', fontSize: 10, fontWeight: '700' },
  listName: { fontSize: 15, fontWeight: '700', color: '#111', letterSpacing: -0.2 },
  listRow: { flexDirection: 'row', alignItems: 'center', marginTop: 3, gap: 3 },
  listLoc: { color: '#aaa', fontSize: 12 },
  listBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  listPrice: { color: '#00b894', fontSize: 13, fontWeight: '700' },
  listDuration: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  listDurText: { color: '#aaa', fontSize: 11 },
  listRating: {
    paddingRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
  },
  listRatingText: { fontSize: 12, fontWeight: '700', color: '#111' },

  // DETAIL
  heroWrap: { height: 300, position: 'relative' },
  heroImg: { width: '100%', height: '100%' },
  heroGradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.08)',
  },
  backBtn: {
    position: 'absolute',
    top: 50,
    left: 16,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  favIconBtn: {
    position: 'absolute',
    top: 50,
    right: 16,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  detailCard: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    marginTop: -24,
    padding: 24,
    paddingBottom: 40,
    minHeight: 400,
  },
  detailTagRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  detailTagPill: {
    backgroundColor: '#e8f8f3',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  detailTagText: { color: '#00b894', fontSize: 12, fontWeight: '700' },
  detailName: { fontSize: 30, fontWeight: '800', color: '#111', letterSpacing: -0.6, marginBottom: 6 },
  detailLocRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 20 },
  detailLoc: { color: '#888', fontSize: 14 },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  statItem: { flex: 1, alignItems: 'center', gap: 5 },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#e8f8f3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statVal: { fontSize: 13, fontWeight: '700', color: '#111' },
  statLbl: { fontSize: 11, color: '#aaa' },
  statDivider: { width: 1, backgroundColor: '#eee', marginHorizontal: 4 },
  divider: { height: 1, backgroundColor: '#f0f0f0', marginBottom: 20 },
  descTitle: { fontSize: 17, fontWeight: '700', color: '#111', marginBottom: 10 },
  descText: { fontSize: 14, color: '#666', lineHeight: 22, marginBottom: 28 },
  ctaBtn: {
    backgroundColor: '#00b894',
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#00b894',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 4,
  },
  ctaBtnActive: { backgroundColor: '#ff6b6b', shadowColor: '#ff6b6b' },
  ctaBtnText: { color: '#fff', fontWeight: '700', fontSize: 15 },

  // SEARCH BOX
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    marginHorizontal: 20,
    marginBottom: 8,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  searchInput: { flex: 1, fontSize: 14, color: '#333' },
  resultCount: { paddingHorizontal: 20, paddingBottom: 10, fontSize: 12, color: '#aaa' },

  // EMPTY
  emptyWrap: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 8 },
  emptyTitle: { fontSize: 16, fontWeight: '600', color: '#ccc' },
  emptySub: { fontSize: 13, color: '#ddd' },

  // FAV COUNT
  favCountBadge: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#fff0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favCountText: { fontSize: 18, fontWeight: '800', color: '#ff6b6b' },

  // TAB
  tabBar: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f5f5f5',
    height: 62,
    paddingBottom: 8,
    paddingTop: 6,
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  tabLabel: { fontSize: 11, fontWeight: '600' },
});