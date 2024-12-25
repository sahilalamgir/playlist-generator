import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from sklearn.cluster import KMeans

df = pd.read_csv("../../data/dataset.csv", index_col=0)
df.dropna(inplace=True)
X = df[["danceability", "energy", "loudness", "valence", "tempo"]]

mms = MinMaxScaler()
scaled_X = mms.fit_transform(X)

kmc = KMeans(n_clusters=6)
distances = kmc.fit_transform(scaled_X)
distances = pd.DataFrame(distances, columns=["dist_0", "dist_1", "dist_2", "dist_3", "dist_4", "dist_5"])
clusters = pd.DataFrame(kmc.labels_, columns=["cluster"])

df = pd.concat([df, distances, clusters], axis=1)
df.dropna(inplace=True)

top_song_ids = ["71cWHhV018hztNkCC45Ayo", "1MDEvpaFk2Ins7N8hGfFlA", "31V1pKLbxnZy2F98VptLvd", "2E3y6X63fbZCYJGELwRAWQ", "3ylvFvzinMnNUYbFc5uQZL", "2itYAgeIb3S62D9qJvgZbx"]
moods = ["sad", "energetic", "chill", "nostalgic", "romantic", "intense"]
cluster_mood_dict = {}
for i in range(6):
    cluster_mood_dict[df[df["track_id"] == top_song_ids[i]]["cluster"].iloc[0]] = moods[i]

df["mood"] = df["cluster"].apply(lambda cluster: cluster_mood_dict[cluster])

def random_song(mood):
    return df[df["mood"] == mood].sample(1)["track_id"].iloc[0]

# mood = input("What mood do you feel right now? (energetic, sad, nostalgic, romantic, chill, intense): ")
# pd.DataFrame(random_song(mood))
