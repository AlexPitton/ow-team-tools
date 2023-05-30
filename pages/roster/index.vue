<template>
    <div class="page roster">
        <h1 class="font-title-bold u-mb50">Team's members</h1>

        <h2 class="font-title u-mb20">
            Active roster
        </h2>

        <div class="players u-flex u-flex-wrap u-mb50">
            <div class="player u-relative" v-for="player in activeRoster" :key="player.id">
                <div class="role-icon">
                    <Tag :label="player.igr" />
                </div>
                <p class="font-title-bold u-mb15">{{player.username}}</p>
                <div class="u-mb15">
                    <p class="font-mono">Informations</p>
                    <pre>{{player}}</pre>
                    <ul>
<!--                        <li><CopyTag :label="player." /></li>-->
                    </ul>
                </div>
                <SignatureHeroes v-if="player.signatureheroes.length > 0" :heroes="player.signatureheroes" />
            </div>
        </div>

        <h2 class="font-title u-mb20">
            Former members
        </h2>

        <div class="players u-flex u-flex-wrap">
            <div class="player u-mb50 u-relative" v-for="player in formerMembers" :key="player.id">
                <div class="role-icon">
                    <p>{{player.igr}}</p>
                </div>
                <p class="font-title-bold u-mb15">{{player.username}}</p>
                <div class="u-mb15">
                    <p class="font-mono">Contact</p>
                    {{player}}
                    <ul>
                        <li></li>
                    </ul>
                </div>
                <SignatureHeroes :heroes="player.signatureheroes" />
            </div>
        </div>
    </div>
</template>

<script>
import SignatureHeroes from "../../components/heroes/SignatureHeroes";
import Tag from "../../components/common/ui/Tag";
import CopyTag from "../../components/common/ui/CopyTag";
export default {
    components: {CopyTag, Tag, SignatureHeroes},
    fetch({store}) {
        return store.dispatch('getUsers')
    },
    computed: {
        roster() {
            return this.$store.state.users
        },
        activeRoster() {
            return this.$store.state.users.filter( user => user.activeRoster)
        },
        formerMembers() {
            return this.$store.state.users.filter( user => !user.activeRoster)
        }
    }
}
</script>

<style lang="scss">
.roster {

    .players {

        .player {
            background-color: $c-primary-light;
            padding: 20px;
            width: 30%;
            border-radius: 8px;

            .role-icon {
                position: absolute;
                top: 20px;
                right: 20px;
            }
        }
    }

}
</style>
