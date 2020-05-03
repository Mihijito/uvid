<template>
  <div>
    <page-title :title="`Room link: http://localhost:8081/#/join/${this.$route.params.roomId}`" />
    <div id="room">
      <div class="user-viewport">
        <div class="user-name">
          {{this.getClientOwner}}
        </div>
        <div id="localVideo">
          <video class="cam" ref="localVideo"></video>
        </div>
      </div>
      <div id="videos" v-for="username in getUsernames" :key="username">
        <div class="user-viewport">
          <div class="user-name">
            {{username}}
          </div>
          <div>
            <video class="cam" :id="username" />
          </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import Vue from 'vue';
import pageTitle from './pageTitle';

export default {
  name: 'Room',
  components: {
    pageTitle,
  },
  data: () => ({
    localStream: {},
    video: {},
    configuration: {
      'iceServers': [
      {'urls': 'stun:stun.stunprotocol.org'},
    ]},
  }),
  sockets: {
    async userJoined(username) {
      if (!(username in this.getUsernamesList)) {
        const connection = new RTCPeerConnection(this.configuration);
        this.addEventListenerToConnection(username, connection)

        const webcamStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        webcamStream.getTracks().forEach(async (track) => {
          await connection.addTrack(track, webcamStream);
        })
        this.ADD_USER({ username, connection });
      }
    },
    async initUserList(payload) {
      payload.forEach(async username => {
        if (!(username in this.getUsernamesList)) {
          const connection = new RTCPeerConnection(this.configuration);
          this.addEventListenerToConnection(username, connection)
          this.ADD_USER({ username, connection });
        }
      });
    },
    async callOffer(offerInfo) {
      console.log('ok');
      const userList = this.getUsernamesList;
      const { callerUsername, offer } = JSON.parse(offerInfo);
      if (callerUsername in userList) {
        await userList[callerUsername].setRemoteDescription(offer);
        console.log(`${callerUsername} saved remote offer`)
        const connection = userList[callerUsername];

        const webcamStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        webcamStream.getTracks().forEach(async (track) => {
          await connection.addTrack(track, webcamStream);
        })

        const answer = await connection.createAnswer({ offerToReceiveVideo: true, offerToReceiveAudio: true });
        await userList[callerUsername].setLocalDescription(answer);

        console.log(`${callerUsername} saved local answer`)

        const video = document.getElementById(callerUsername);
        video.play();
        this.$socket.client.emit('call-response', JSON.stringify({ callerUsername, answer }));
      }
    },
    async callAnswer(answerInfo) {
      const userList = this.getUsernamesList;
      const { calleeUsername, answer } = JSON.parse(answerInfo);
      console.log('asdf')
      if (calleeUsername in userList) {
        await userList[calleeUsername].setRemoteDescription(answer)
        console.log(`${calleeUsername} saved remote answer`)
      }
      const video = document.getElementById(calleeUsername);
      video.play();
    },
  },
  methods: {
    ...mapMutations([
      'ADD_USER'
    ]),
    ...mapActions([
      'addLocalTracks',
    ]),
    addEventListenerToConnection(discoverer, peerConnection) {
      peerConnection.addEventListener('icecandidate', event => {
        if (event.candidate) {
          console.log(`${discoverer} found a new iceCandidate`);
          this.$socket.client.emit('newIceCandidateTransferRequest', JSON.stringify({ discoverer, iceCandidate: event.candidate }));
        }
      });
      peerConnection.addEventListener('connectionstatechange', () => {
        if (peerConnection.connectionState === 'connected') {
          console.log(`Connection with ${discoverer} established`);
        }
      });
      peerConnection.ontrack = (event) => {
        console.log('hey');
        const video = document.getElementById(discoverer);
        console.log(event.streams[0])
        video.srcObject = event.streams[0];
      };
      peerConnection.onnegotiationneeded = async () => {
        const offer = await peerConnection.createOffer({ offerToReceiveVideo: true, offerToReceiveAudio: true });
        await peerConnection.setLocalDescription(offer);
        console.log(`${discoverer} saved local offer`);

        this.$socket.client.emit('call-request', JSON.stringify({ callee: discoverer, offer }));
      }
    }
  },
  computed: {
    ...mapGetters([
      'getUsernamesList',
      'getClientOwner',
    ]),
    getUsernames() {
      const updatedUserList = this.getUsernamesList;
      const correspondants = Object.keys(updatedUserList).filter((username) => username !== this.getClientOwner);
      return correspondants; 
    },
  },
  beforeRouteLeave(from, to, next) {
    Vue.prototype.$socket.client.emit('disconnect-user');
    next();
  },
  async mounted() {
    this.video = this.$refs.localVideo;
    const webcamStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    this.video.srcObject = webcamStream;
    this.video.muted = true;
    this.video.play();
  },
}
</script>

<style scoped>
#room {
  display: flex;
  justify-content: center;
  margin-top: 3em;
  width: 100%;
  flex-wrap: wrap;
}

#videos {
  display: flex;
}

#localVideo {
  display: flex;
}

.user-viewport {
  margin-top: 3em;
  margin-right: 2em;
}

.cam {
  max-width: 400px;
  border-radius: 10px;
}

.user-name {
  display: flex;
  flex-direction: column;
  font-weight: bold;
  font-size: large;
  color: #eee;
  text-align: left;
  padding-left: 1.5em;
  margin-bottom: 0.25em;
}
</style>