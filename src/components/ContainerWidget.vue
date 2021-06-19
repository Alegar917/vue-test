<template>
  <div>
    <div class="row">
      <div id="warehouse" class="col p-2 box">
        <h5 class="text-white">Warehouse Items</h5>
        <div class="row m-0 mb-1">
          <input
            type="text"
            placeholder="Search"
            id="search"
            class="text-center m-auto"
            autocomplete="off"
            :class="{
              'w-25': !searching,
              'w-75': searching
            }"
            @focus="searching=true"
            @blur="searching=false"
            @input="search($event.target.value)"
            style="border: none; border-radius: 25px; outline: none; text-overflow: ellipsis;"/>
        </div>
        <div class="row m-0">
          <div class="col-3" style="font-size: 14px; color: gainsboro;">
            BOL
          </div>
          <div class="col" style="font-size: 14px; color: gainsboro;">
            Exporter
          </div>
          <div class="col" style="font-size: 14px; color: gainsboro;">
            Importer
          </div>
        </div>
        <div v-if="items.warehouse.length === 0">
          No more items.
        </div>
        <draggable
          v-model="items.warehouse"
          group="shared"
          @start="drag=true"
          @end="drag=false"
          animation="150"
          selected-class="selected"
          ghost-class="ghostItem"
          multi-drag
          multi-drag-key="ALT"
          class="inner-box"
          style="height: 522px;"
        >
          <ContainerWidgetItem
            v-for="item in items.warehouse"
            v-show="resultIds.has(item.id)"
            :item="item"
            :key="item.id"
          >
          </ContainerWidgetItem>
        </draggable>
      </div>
      <div class="col-1 m-auto" style="max-width: 78px;">
        <b-icon-caret-right-fill
          font-scale="2"
          @mousedown="moveItems()"
        ></b-icon-caret-right-fill>
        <b-icon-caret-left-fill
          font-scale="2"
          @mousedown="moveItems(false)"
        ></b-icon-caret-left-fill>
      </div>
      <div
        class="col p-2 box"
        id="active-container"
        style="overflow: hidden;"
      >
        <div
          v-for="(itemList, name) in items"
          v-show="name === active"
          :key="name"
        >
          <h5 class="text-white">
            Container
            <u data-toggle="tooltip" data-placement="top" :title="name">
              ...
            </u>{{ lastFour(name) }}
            <button
              type="button"
              class="btn btn-light mr-2 h6 p-0 mt-1 px-2"
              style="vertical-align: bottom; float: right; user-select: none; font-size: small;"
              @click="clearActive()"
            >
              Clear
            </button>
          </h5>
          <div class="row m-0 w-100">
            <div class="col-3" style="font-size: 14px; color: gainsboro;">
              BOL
            </div>
            <div class="col" style="font-size: 14px; color: gainsboro;">
              Exporter
            </div>
            <div class="col" style="font-size: 14px; color: gainsboro;">
              Importer
            </div>
          </div>
          <div v-if="items[active].length === 0">
            No more items.
          </div>
          <draggable
            v-model="items[name]"
            group="shared"
            @start="drag=true"
            @end="drag=false"
            animation="150"
            selected-class="selected"
            ghost-class="ghostItem"
            multi-drag
            multi-drag-key="ALT"
            class="inner-box"
            :key="name"
          >
            <ContainerWidgetItem
              v-for="item in itemList"
              :item="item"
              :key="item.id"
            >
            </ContainerWidgetItem>
          </draggable>
        </div>
        <div
          class="row pt-1"
        >
          <div class="col-4">
            <span class="badge badge-pill badge-primary">{{ activeRecords }} Items</span>
          </div>
          <div class="col-4">
            <span class="badge badge-pill badge-warning">{{ activeWeight }} lbs</span>
          </div>
          <div class="col-4">
            <span class="badge badge-pill badge-success">{{ activeVolume }} in<sup>3</sup></span>
          </div>
        </div>
        <hr
          style="border-top: 2px solid rgba(255,255,255,.3);"/>
        <div id="boxes" class="row m-0 mt-2">
          <div class="col-10 p-0">
            <div class="row m-auto flex-nowrap" style="overflow-x: auto;">
              <ContainerWidgetSummary
                v-for="(item, name) in items"
                :item="item"
                :name="name"
                :key="item.id"
                v-model="active"
                @remove_container="removeContainer"
                class="mr-1 col-5"
              ></ContainerWidgetSummary>
            </div>
          </div>
          <div class="col-2 pl-2 pr-0">
            <b-button
              v-b-modal.new-container
              variant="light"
              class="p-0"
              style="width: 100%; height: 100%;"
            >
              Add
            </b-button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <b-modal
      id="new-container"
    >
      <template v-slot:default>
        Container form.
      </template>
    </b-modal>
  </div>
</template>

<script>
import Fuse from 'fuse.js';
import Vue from 'vue';
import ContainerWidgetItem from './ContainerWidgetItem.vue';
import ContainerWidgetSummary from './ContainerWidgetSummary.vue';

const draggable = require('vuedraggable');

function randomDate(start, end) {
  const d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate()}`;
  const year = d.getFullYear();

  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;

  return [year, month, day].join('-');
}

/*
(c) by Thomas Konings
Random Name Generator for Javascript
*/

function capFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// https://gist.github.com/tkon99/4c98af713acc73bed74c
function generateName() {
  const name1 = ['abandoned', 'able', 'absolute', 'adorable', 'adventurous', 'academic', 'acceptable', 'acclaimed', 'accomplished', 'accurate', 'aching', 'acidic', 'acrobatic', 'active', 'actual', 'adept', 'admirable', 'admired', 'adolescent', 'adorable', 'adored', 'advanced', 'afraid', 'affectionate', 'aged', 'aggravating', 'aggressive', 'agile', 'agitated', 'agonizing', 'agreeable', 'ajar', 'alarmed', 'alarming', 'alert', 'alienated', 'alive', 'all', 'altruistic', 'amazing', 'ambitious', 'ample', 'amused', 'amusing', 'anchored', 'ancient', 'angelic', 'angry', 'anguished', 'animated', 'annual', 'another', 'antique', 'anxious', 'any', 'apprehensive', 'appropriate', 'apt', 'arctic', 'arid', 'aromatic', 'artistic', 'ashamed', 'assured', 'astonishing', 'athletic', 'attached', 'attentive', 'attractive', 'austere', 'authentic', 'authorized', 'automatic', 'avaricious', 'average', 'aware', 'awesome', 'awful', 'awkward', 'babyish', 'bad', 'back', 'baggy', 'bare', 'barren', 'basic', 'beautiful', 'belated', 'beloved', 'beneficial', 'better', 'best', 'bewitched', 'big', 'big-hearted', 'biodegradable', 'bite-sized', 'bitter', 'black', 'black-and-white', 'bland', 'blank', 'blaring', 'bleak', 'blind', 'blissful', 'blond', 'blue', 'blushing', 'bogus', 'boiling', 'bold', 'bony', 'boring', 'bossy', 'both', 'bouncy', 'bountiful', 'bowed', 'brave', 'breakable', 'brief', 'bright', 'brilliant', 'brisk', 'broken', 'bronze', 'brown', 'bruised', 'bubbly', 'bulky', 'bumpy', 'buoyant', 'burdensome', 'burly', 'bustling', 'busy', 'buttery', 'buzzing', 'calculating', 'calm', 'candid', 'canine', 'capital', 'carefree', 'careful', 'careless', 'caring', 'cautious', 'cavernous', 'celebrated', 'charming', 'cheap', 'cheerful', 'cheery', 'chief', 'chilly', 'chubby', 'circular', 'classic', 'clean', 'clear', 'clear-cut', 'clever', 'close', 'closed', 'cloudy', 'clueless', 'clumsy', 'cluttered', 'coarse', 'cold', 'colorful', 'colorless', 'colossal', 'comfortable', 'common', 'compassionate', 'competent', 'complete', 'complex', 'complicated', 'composed', 'concerned', 'concrete', 'confused', 'conscious', 'considerate', 'constant', 'content', 'conventional', 'cooked', 'cool', 'cooperative', 'coordinated', 'corny', 'corrupt', 'costly', 'courageous', 'courteous', 'crafty', 'crazy', 'creamy', 'creative', 'creepy', 'criminal', 'crisp', 'critical', 'crooked', 'crowded', 'cruel', 'crushing', 'cuddly', 'cultivated', 'cultured', 'cumbersome', 'curly', 'curvy', 'cute', 'cylindrical', 'damaged', 'damp', 'dangerous', 'dapper', 'daring', 'darling', 'dark', 'dazzling', 'dead', 'deadly', 'deafening', 'dear', 'dearest', 'decent', 'decimal', 'decisive', 'deep', 'defenseless', 'defensive', 'defiant', 'deficient', 'definite', 'definitive', 'delayed', 'delectable', 'delicious', 'delightful', 'delirious', 'demanding', 'dense', 'dental', 'dependable', 'dependent', 'descriptive', 'deserted', 'detailed', 'determined', 'devoted', 'different', 'difficult', 'digital', 'diligent', 'dim', 'dimpled', 'dimwitted', 'direct', 'disastrous', 'discrete', 'disfigured', 'disgusting', 'disloyal', 'dismal', 'distant', 'downright', 'dreary', 'dirty', 'disguised', 'dishonest', 'dismal', 'distant', 'distinct', 'distorted', 'dizzy', 'dopey', 'doting', 'double', 'downright', 'drab', 'drafty', 'dramatic', 'dreary', 'droopy', 'dry', 'dual', 'dull', 'dutiful', 'each', 'eager', 'earnest', 'early', 'easy', 'easy-going', 'ecstatic', 'edible', 'educated', 'elaborate', 'elastic', 'elated', 'elderly', 'electric', 'elegant', 'elementary', 'elliptical', 'embarrassed', 'embellished', 'eminent', 'emotional', 'empty', 'enchanted', 'enchanting', 'energetic', 'enlightened', 'enormous', 'enraged', 'entire', 'envious', 'equal', 'equatorial', 'essential', 'esteemed', 'ethical', 'euphoric', 'even', 'evergreen', 'everlasting', 'every', 'evil', 'exalted', 'excellent', 'exemplary', 'exhausted', 'excitable', 'excited', 'exciting', 'exotic', 'expensive', 'experienced', 'expert', 'extraneous', 'extroverted', 'extra-large', 'extra-small', 'fabulous', 'failing', 'faint', 'fair', 'faithful', 'fake', 'false', 'familiar', 'famous', 'fancy', 'fantastic', 'far', 'faraway', 'far-flung', 'far-off', 'fast', 'fat', 'fatal', 'fatherly', 'favorable', 'favorite', 'fearful', 'fearless', 'feisty', 'feline', 'female', 'feminine', 'few', 'fickle', 'filthy', 'fine', 'finished', 'firm', 'first', 'firsthand', 'fitting', 'fixed', 'flaky', 'flamboyant', 'flashy', 'flat', 'flawed', 'flawless', 'flickering', 'flimsy', 'flippant', 'flowery', 'fluffy', 'fluid', 'flustered', 'focused', 'fond', 'foolhardy', 'foolish', 'forceful', 'forked', 'formal', 'forsaken', 'forthright', 'fortunate', 'fragrant', 'frail', 'frank', 'frayed', 'free', 'French', 'fresh', 'frequent', 'friendly', 'frightened', 'frightening', 'frigid', 'frilly', 'frizzy', 'frivolous', 'front', 'frosty', 'frozen', 'frugal', 'fruitful', 'full', 'fumbling', 'functional', 'funny', 'fussy', 'fuzzy', 'gargantuan', 'gaseous', 'general', 'generous', 'gentle', 'genuine', 'giant', 'giddy', 'gigantic', 'gifted', 'giving', 'glamorous', 'glaring', 'glass', 'gleaming', 'gleeful', 'glistening', 'glittering', 'gloomy', 'glorious', 'glossy', 'glum', 'golden', 'good', 'good-natured', 'gorgeous', 'graceful', 'gracious', 'grand', 'grandiose', 'granular', 'grateful', 'grave', 'gray', 'great', 'greedy', 'green', 'gregarious', 'grim', 'grimy', 'gripping', 'grizzled', 'gross', 'grotesque', 'grouchy', 'grounded', 'growing', 'growling', 'grown', 'grubby', 'gruesome', 'grumpy', 'guilty', 'gullible', 'gummy', 'hairy', 'half', 'handmade', 'handsome', 'handy', 'happy', 'happy-go-lucky', 'hard', 'hard-to-find', 'harmful', 'harmless', 'harmonious', 'harsh', 'hasty', 'hateful', 'haunting', 'healthy', 'heartfelt', 'hearty', 'heavenly', 'heavy', 'hefty', 'helpful', 'helpless', 'hidden', 'hideous', 'high', 'high-level', 'hilarious', 'hoarse', 'hollow', 'homely', 'honest', 'honorable', 'honored', 'hopeful', 'horrible', 'hospitable', 'hot', 'huge', 'humble', 'humiliating', 'humming', 'humongous', 'hungry', 'hurtful', 'husky', 'icky', 'icy', 'ideal', 'idealistic', 'identical', 'idle', 'idiotic', 'idolized', 'ignorant', 'ill', 'illegal', 'ill-fated', 'ill-informed', 'illiterate', 'illustrious', 'imaginary', 'imaginative', 'immaculate', 'immaterial', 'immediate', 'immense', 'impassioned', 'impeccable', 'impartial', 'imperfect', 'imperturbable', 'impish', 'impolite', 'important', 'impossible', 'impractical', 'impressionable', 'impressive', 'improbable', 'impure', 'inborn', 'incomparable', 'incompatible', 'incomplete', 'inconsequential', 'incredible', 'indelible', 'inexperienced', 'indolent', 'infamous', 'infantile', 'infatuated', 'inferior', 'infinite', 'informal', 'innocent', 'insecure', 'insidious', 'insignificant', 'insistent', 'instructive', 'insubstantial', 'intelligent', 'intent', 'intentional', 'interesting', 'internal', 'international', 'intrepid', 'ironclad', 'irresponsible', 'irritating', 'itchy', 'jaded', 'jagged', 'jam-packed', 'jaunty', 'jealous', 'jittery', 'joint', 'jolly', 'jovial', 'joyful', 'joyous', 'jubilant', 'judicious', 'juicy', 'jumbo', 'junior', 'jumpy', 'juvenile', 'kaleidoscopic', 'keen', 'key', 'kind', 'kindhearted', 'kindly', 'klutzy', 'knobby', 'knotty', 'knowledgeable', 'knowing', 'known', 'kooky', 'kosher', 'lame', 'lanky', 'large', 'last', 'lasting', 'late', 'lavish', 'lawful', 'lazy', 'leading', 'lean', 'leafy', 'left', 'legal', 'legitimate', 'light', 'lighthearted', 'likable', 'likely', 'limited', 'limp', 'limping', 'linear', 'lined', 'liquid', 'little', 'live', 'lively', 'livid', 'loathsome', 'lone', 'lonely', 'long', 'long-term', 'loose', 'lopsided', 'lost', 'loud', 'lovable', 'lovely', 'loving', 'low', 'loyal', 'lucky', 'lumbering', 'luminous', 'lumpy', 'lustrous', 'luxurious', 'mad', 'made-up', 'magnificent', 'majestic', 'major', 'male', 'mammoth', 'married', 'marvelous', 'masculine', 'massive', 'mature', 'meager', 'mealy', 'mean', 'measly', 'meaty', 'medical', 'mediocre', 'medium', 'meek', 'mellow', 'melodic', 'memorable', 'menacing', 'merry', 'messy', 'metallic', 'mild', 'milky', 'mindless', 'miniature', 'minor', 'minty', 'miserable', 'miserly', 'misguided', 'misty', 'mixed', 'modern', 'modest', 'moist', 'monstrous', 'monthly', 'monumental', 'moral', 'mortified', 'motherly', 'motionless', 'mountainous', 'muddy', 'muffled', 'multicolored', 'mundane', 'murky', 'mushy', 'musty', 'muted', 'mysterious', 'naive', 'narrow', 'nasty', 'natural', 'naughty', 'nautical', 'near', 'neat', 'necessary', 'needy', 'negative', 'neglected', 'negligible', 'neighboring', 'nervous', 'new', 'next', 'nice', 'nifty', 'nimble', 'nippy', 'nocturnal', 'noisy', 'nonstop', 'normal', 'notable', 'noted', 'noteworthy', 'novel', 'noxious', 'numb', 'nutritious', 'nutty', 'obedient', 'obese', 'oblong', 'oily', 'oblong', 'obvious', 'occasional', 'odd', 'oddball', 'offbeat', 'offensive', 'official', 'old', 'old-fashioned', 'only', 'open', 'optimal', 'optimistic', 'opulent', 'orange', 'orderly', 'organic', 'ornate', 'ornery', 'ordinary', 'original', 'other', 'our', 'outlying', 'outgoing', 'outlandish', 'outrageous', 'outstanding', 'oval', 'overcooked', 'overdue', 'overjoyed', 'overlooked', 'palatable', 'pale', 'paltry', 'parallel', 'parched', 'partial', 'passionate', 'past', 'pastel', 'peaceful', 'peppery', 'perfect', 'perfumed', 'periodic', 'perky', 'personal', 'pertinent', 'pesky', 'pessimistic', 'petty', 'phony', 'physical', 'piercing', 'pink', 'pitiful', 'plain', 'plaintive', 'plastic', 'playful', 'pleasant', 'pleased', 'pleasing', 'plump', 'plush', 'polished', 'polite', 'political', 'pointed', 'pointless', 'poised', 'poor', 'popular', 'portly', 'posh', 'positive', 'possible', 'potable', 'powerful', 'powerless', 'practical', 'precious', 'present', 'prestigious', 'pretty', 'precious', 'previous', 'pricey', 'prickly', 'primary', 'prime', 'pristine', 'private', 'prize', 'probable', 'productive', 'profitable', 'profuse', 'proper', 'proud', 'prudent', 'punctual', 'pungent', 'puny', 'pure', 'purple', 'pushy', 'putrid', 'puzzled', 'puzzling', 'quaint', 'qualified', 'quarrelsome', 'quarterly', 'queasy', 'querulous', 'questionable', 'quick', 'quick-witted', 'quiet', 'quintessential', 'quirky', 'quixotic', 'quizzical', 'radiant', 'ragged', 'rapid', 'rare', 'rash', 'raw', 'recent', 'reckless', 'rectangular', 'ready', 'real', 'realistic', 'reasonable', 'red', 'reflecting', 'regal', 'regular', 'reliable', 'relieved', 'remarkable', 'remorseful', 'remote', 'repentant', 'required', 'respectful', 'responsible', 'repulsive', 'revolving', 'rewarding', 'rich', 'rigid', 'right', 'ringed', 'ripe', 'roasted', 'robust', 'rosy', 'rotating', 'rotten', 'rough', 'round', 'rowdy', 'royal', 'rubbery', 'rundown', 'ruddy', 'rude', 'runny', 'rural', 'rusty', 'sad', 'safe', 'salty', 'same', 'sandy', 'sane', 'sarcastic', 'sardonic', 'satisfied', 'scaly', 'scarce', 'scared', 'scary', 'scented', 'scholarly', 'scientific', 'scornful', 'scratchy', 'scrawny', 'second', 'secondary', 'second-hand', 'secret', 'self-assured', 'self-reliant', 'selfish', 'sentimental', 'separate', 'serene', 'serious', 'serpentine', 'several', 'severe', 'shabby', 'shadowy', 'shady', 'shallow', 'shameful', 'shameless', 'sharp', 'shimmering', 'shiny', 'shocked', 'shocking', 'shoddy', 'short', 'short-term', 'showy', 'shrill', 'shy', 'sick', 'silent', 'silky', 'silly', 'silver', 'similar', 'simple', 'simplistic', 'sinful', 'single', 'sizzling', 'skeletal', 'skinny', 'sleepy', 'slight', 'slim', 'slimy', 'slippery', 'slow', 'slushy', 'small', 'smart', 'smoggy', 'smooth', 'smug', 'snappy', 'snarling', 'sneaky', 'sniveling', 'snoopy', 'sociable', 'soft', 'soggy', 'solid', 'somber', 'some', 'spherical', 'sophisticated', 'sore', 'sorrowful', 'soulful', 'soupy', 'sour', 'Spanish', 'sparkling', 'sparse', 'specific', 'spectacular', 'speedy', 'spicy', 'spiffy', 'spirited', 'spiteful', 'splendid', 'spotless', 'spotted', 'spry', 'square', 'squeaky', 'squiggly', 'stable', 'staid', 'stained', 'stale', 'standard', 'starchy', 'stark', 'starry', 'steep', 'sticky', 'stiff', 'stimulating', 'stingy', 'stormy', 'straight', 'strange', 'steel', 'strict', 'strident', 'striking', 'striped', 'strong', 'studious', 'stunning', 'stupendous', 'stupid', 'sturdy', 'stylish', 'subdued', 'submissive', 'substantial', 'subtle', 'suburban', 'sudden', 'sugary', 'sunny', 'super', 'superb', 'superficial', 'superior', 'supportive', 'sure-footed', 'surprised', 'suspicious', 'svelte', 'sweaty', 'sweet', 'sweltering', 'swift', 'sympathetic', 'tall', 'talkative', 'tame', 'tan', 'tangible', 'tart', 'tasty', 'tattered', 'taut', 'tedious', 'teeming', 'tempting', 'tender', 'tense', 'tepid', 'terrible', 'terrific', 'testy', 'thankful', 'that', 'these', 'thick', 'thin', 'third', 'thirsty', 'this', 'thorough', 'thorny', 'those', 'thoughtful', 'threadbare', 'thrifty', 'thunderous', 'tidy', 'tight', 'timely', 'tinted', 'tiny', 'tired', 'torn', 'total', 'tough', 'traumatic', 'treasured', 'tremendous', 'tragic', 'trained', 'tremendous', 'triangular', 'tricky', 'trifling', 'trim', 'trivial', 'troubled', 'true', 'trusting', 'trustworthy', 'trusty', 'truthful', 'tubby', 'turbulent', 'twin', 'ugly', 'ultimate', 'unacceptable', 'unaware', 'uncomfortable', 'uncommon', 'unconscious', 'understated', 'unequaled', 'uneven', 'unfinished', 'unfit', 'unfolded', 'unfortunate', 'unhappy', 'unhealthy', 'uniform', 'unimportant', 'unique', 'united', 'unkempt', 'unknown', 'unlawful', 'unlined', 'unlucky', 'unnatural', 'unpleasant', 'unrealistic', 'unripe', 'unruly', 'unselfish', 'unsightly', 'unsteady', 'unsung', 'untidy', 'untimely', 'untried', 'untrue', 'unused', 'unusual', 'unwelcome', 'unwieldy', 'unwilling', 'unwitting', 'unwritten', 'upbeat', 'upright', 'upset', 'urban', 'usable', 'used', 'useful', 'useless', 'utilized', 'utter', 'vacant', 'vague', 'vain', 'valid', 'valuable', 'vapid', 'variable', 'vast', 'velvety', 'venerated', 'vengeful', 'verifiable', 'vibrant', 'vicious', 'victorious', 'vigilant', 'vigorous', 'villainous', 'violet', 'violent', 'virtual', 'virtuous', 'visible', 'vital', 'vivacious', 'vivid', 'voluminous', 'wan', 'warlike', 'warm', 'warmhearted', 'warped', 'wary', 'wasteful', 'watchful', 'waterlogged', 'watery', 'wavy', 'wealthy', 'weak', 'weary', 'webbed', 'wee', 'weekly', 'weepy', 'weighty', 'weird', 'welcome', 'well-documented', 'well-groomed', 'well-informed', 'well-lit', 'well-made', 'well-off', 'well-to-do', 'well-worn', 'wet', 'which', 'whimsical', 'whirlwind', 'whispered', 'white', 'whole', 'whopping', 'wicked', 'wide', 'wide-eyed', 'wiggly', 'wild', 'willing', 'wilted', 'winding', 'windy', 'winged', 'wiry', 'wise', 'witty', 'wobbly', 'woeful', 'wonderful', 'wooden', 'woozy', 'wordy', 'worldly', 'worn', 'worried', 'worrisome', 'worse', 'worst', 'worthless', 'worthwhile', 'worthy', 'wrathful', 'wretched', 'writhing', 'wrong', 'wry', 'yawning', 'yearly', 'yellow', 'yellowish', 'young', 'youthful', 'yummy', 'zany', 'zealous', 'zesty', 'zigzag', 'rocky'];

  const name2 = ['people', 'history', 'way', 'art', 'world', 'information', 'map', 'family', 'government', 'health', 'system', 'computer', 'meat', 'year', 'thanks', 'music', 'person', 'reading', 'method', 'data', 'food', 'understanding', 'theory', 'law', 'bird', 'literature', 'problem', 'software', 'control', 'knowledge', 'power', 'ability', 'economics', 'love', 'internet', 'television', 'science', 'library', 'nature', 'fact', 'product', 'idea', 'temperature', 'investment', 'area', 'society', 'activity', 'story', 'industry', 'media', 'thing', 'oven', 'community', 'definition', 'safety', 'quality', 'development', 'language', 'management', 'player', 'variety', 'video', 'week', 'security', 'country', 'exam', 'movie', 'organization', 'equipment', 'physics', 'analysis', 'policy', 'series', 'thought', 'basis', 'boyfriend', 'direction', 'strategy', 'technology', 'army', 'camera', 'freedom', 'paper', 'environment', 'child', 'instance', 'month', 'truth', 'marketing', 'university', 'writing', 'article', 'department', 'difference', 'goal', 'news', 'audience', 'fishing', 'growth', 'income', 'marriage', 'user', 'combination', 'failure', 'meaning', 'medicine', 'philosophy', 'teacher', 'communication', 'night', 'chemistry', 'disease', 'disk', 'energy', 'nation', 'road', 'role', 'soup', 'advertising', 'location', 'success', 'addition', 'apartment', 'education', 'math', 'moment', 'painting', 'politics', 'attention', 'decision', 'event', 'property', 'shopping', 'student', 'wood', 'competition', 'distribution', 'entertainment', 'office', 'population', 'president', 'unit', 'category', 'cigarette', 'context', 'introduction', 'opportunity', 'performance', 'driver', 'flight', 'length', 'magazine', 'newspaper', 'relationship', 'teaching', 'cell', 'dealer', 'debate', 'finding', 'lake', 'member', 'message', 'phone', 'scene', 'appearance', 'association', 'concept', 'customer', 'death', 'discussion', 'housing', 'inflation', 'insurance', 'mood', 'woman', 'advice', 'blood', 'effort', 'expression', 'importance', 'opinion', 'payment', 'reality', 'responsibility', 'situation', 'skill', 'statement', 'wealth', 'application', 'city', 'county', 'depth', 'estate', 'foundation', 'grandmother', 'heart', 'perspective', 'photo', 'recipe', 'studio', 'topic', 'collection', 'depression', 'imagination', 'passion', 'percentage', 'resource', 'setting', 'ad', 'agency', 'college', 'connection', 'criticism', 'debt', 'description', 'memory', 'patience', 'secretary', 'solution', 'administration', 'aspect', 'attitude', 'director', 'personality', 'psychology', 'recommendation', 'response', 'selection', 'storage', 'version', 'alcohol', 'argument', 'complaint', 'contract', 'emphasis', 'highway', 'loss', 'membership', 'possession', 'preparation', 'steak', 'union', 'agreement', 'cancer', 'currency', 'employment', 'engineering', 'entry', 'interaction', 'limit', 'mixture', 'preference', 'region', 'republic', 'seat', 'tradition', 'virus', 'actor', 'classroom', 'delivery', 'device', 'difficulty', 'drama', 'election', 'engine', 'football', 'guidance', 'hotel', 'match', 'owner', 'priority', 'protection', 'suggestion', 'tension', 'variation', 'anxiety', 'atmosphere', 'awareness', 'bread', 'climate', 'comparison', 'confusion', 'construction', 'elevator', 'emotion', 'employee', 'employer', 'guest', 'height', 'leadership', 'mall', 'manager', 'operation', 'recording', 'respect', 'sample', 'transportation', 'boring', 'charity', 'cousin', 'disaster', 'editor', 'efficiency', 'excitement', 'extent', 'feedback', 'guitar', 'homework', 'leader', 'mom', 'outcome', 'permission', 'presentation', 'promotion', 'reflection', 'refrigerator', 'resolution', 'revenue', 'session', 'singer', 'tennis', 'basket', 'bonus', 'cabinet', 'childhood', 'church', 'clothes', 'coffee', 'dinner', 'drawing', 'hair', 'hearing', 'initiative', 'judgment', 'lab', 'measurement', 'mode', 'mud', 'orange', 'poetry', 'police', 'possibility', 'procedure', 'queen', 'ratio', 'relation', 'restaurant', 'satisfaction', 'sector', 'signature', 'significance', 'song', 'tooth', 'town', 'vehicle', 'volume', 'wife', 'accident', 'airport', 'appointment', 'arrival', 'assumption', 'baseball', 'chapter', 'committee', 'conversation', 'database', 'enthusiasm', 'error', 'explanation', 'farmer', 'gate', 'girl', 'hall', 'historian', 'hospital', 'injury', 'instruction', 'maintenance', 'manufacturer', 'meal', 'perception', 'pie', 'poem', 'presence', 'proposal', 'reception', 'replacement', 'revolution', 'river', 'son', 'speech', 'tea', 'village', 'warning', 'winner', 'worker', 'writer', 'assistance', 'breath', 'buyer', 'chest', 'chocolate', 'conclusion', 'contribution', 'cookie', 'courage', 'desk', 'drawer', 'establishment', 'examination', 'garbage', 'grocery', 'honey', 'impression', 'improvement', 'independence', 'insect', 'inspection', 'inspector', 'king', 'ladder', 'menu', 'penalty', 'piano', 'potato', 'profession', 'professor', 'quantity', 'reaction', 'requirement', 'salad', 'sister', 'supermarket', 'tongue', 'weakness', 'wedding', 'affair', 'ambition', 'analyst', 'apple', 'assignment', 'assistant', 'bathroom', 'bedroom', 'beer', 'birthday', 'celebration', 'championship', 'cheek', 'client', 'consequence', 'departure', 'diamond', 'dirt', 'ear', 'fortune', 'friendship', 'funeral', 'gene', 'girlfriend', 'hat', 'indication', 'intention', 'lady', 'midnight', 'negotiation', 'obligation', 'passenger', 'pizza', 'platform', 'poet', 'pollution', 'recognition', 'reputation', 'shirt', 'speaker', 'stranger', 'surgery', 'sympathy', 'tale', 'throat', 'trainer', 'uncle', 'youth', 'time', 'work', 'film', 'water', 'money', 'example', 'while', 'business', 'study', 'game', 'life', 'form', 'air', 'day', 'place', 'number', 'part', 'field', 'fish', 'back', 'process', 'heat', 'hand', 'experience', 'job', 'book', 'end', 'point', 'type', 'home', 'economy', 'value', 'body', 'market', 'guide', 'interest', 'state', 'radio', 'course', 'company', 'price', 'size', 'card', 'list', 'mind', 'trade', 'line', 'care', 'group', 'risk', 'word', 'fat', 'force', 'key', 'light', 'training', 'name', 'school', 'top', 'amount', 'level', 'order', 'practice', 'research', 'sense', 'service', 'piece', 'web', 'boss', 'sport', 'fun', 'house', 'page', 'term', 'test', 'answer', 'sound', 'focus', 'matter', 'kind', 'soil', 'board', 'oil', 'picture', 'access', 'garden', 'range', 'rate', 'reason', 'future', 'site', 'demand', 'exercise', 'image', 'case', 'cause', 'coast', 'action', 'age', 'bad', 'boat', 'record', 'result', 'section', 'building', 'mouse', 'cash', 'class', 'period', 'plan', 'store', 'tax', 'side', 'subject', 'space', 'rule', 'stock', 'weather', 'chance', 'figure', 'man', 'model', 'source', 'beginning', 'earth', 'program', 'chicken', 'design', 'feature', 'head', 'material', 'purpose', 'question', 'rock', 'salt', 'act', 'birth', 'car', 'dog', 'object', 'scale', 'sun', 'note', 'profit', 'rent', 'speed', 'style', 'war', 'bank', 'craft', 'half', 'inside', 'outside', 'standard', 'bus', 'exchange', 'eye', 'fire', 'position', 'pressure', 'stress', 'advantage', 'benefit', 'box', 'frame', 'issue', 'step', 'cycle', 'face', 'item', 'metal', 'paint', 'review', 'room', 'screen', 'structure', 'view', 'account', 'ball', 'discipline', 'medium', 'share', 'balance', 'bit', 'black', 'bottom', 'choice', 'gift', 'impact', 'machine', 'shape', 'tool', 'wind', 'address', 'average', 'career', 'culture', 'morning', 'pot', 'sign', 'table', 'task', 'condition', 'contact', 'credit', 'egg', 'hope', 'ice', 'network', 'north', 'square', 'attempt', 'date', 'effect', 'link', 'post', 'star', 'voice', 'capital', 'challenge', 'friend', 'self', 'shot', 'brush', 'couple', 'exit', 'front', 'function', 'lack', 'living', 'plant', 'plastic', 'spot', 'summer', 'taste', 'theme', 'track', 'wing', 'brain', 'button', 'click', 'desire', 'foot', 'gas', 'influence', 'notice', 'rain', 'wall', 'base', 'damage', 'distance', 'feeling', 'pair', 'savings', 'staff', 'sugar', 'target', 'text', 'animal', 'author', 'budget', 'discount', 'file', 'ground', 'lesson', 'minute', 'officer', 'phase', 'reference', 'register', 'sky', 'stage', 'stick', 'title', 'trouble', 'bowl', 'bridge', 'campaign', 'character', 'club', 'edge', 'evidence', 'fan', 'letter', 'lock', 'maximum', 'novel', 'option', 'pack', 'park', 'quarter', 'skin', 'sort', 'weight', 'baby', 'background', 'carry', 'dish', 'factor', 'fruit', 'glass', 'joint', 'master', 'muscle', 'red', 'strength', 'traffic', 'trip', 'vegetable', 'appeal', 'chart', 'gear', 'ideal', 'kitchen', 'land', 'log', 'mother', 'net', 'party', 'principle', 'relative', 'sale', 'season', 'signal', 'spirit', 'street', 'tree', 'wave', 'belt', 'bench', 'commission', 'copy', 'drop', 'minimum', 'path', 'progress', 'project', 'sea', 'south', 'status', 'stuff', 'ticket', 'tour', 'angle', 'blue', 'breakfast', 'confidence', 'daughter', 'degree', 'doctor', 'dot', 'dream', 'duty', 'essay', 'father', 'fee', 'finance', 'hour', 'juice', 'luck', 'milk', 'mouth', 'peace', 'pipe', 'stable', 'storm', 'substance', 'team', 'trick', 'afternoon', 'bat', 'beach', 'blank', 'catch', 'chain', 'consideration', 'cream', 'crew', 'detail', 'gold', 'interview', 'kid', 'mark', 'mission', 'pain', 'pleasure', 'score', 'screw', 'sex', 'shop', 'shower', 'suit', 'tone', 'window', 'agent', 'band', 'bath', 'block', 'bone', 'calendar', 'candidate', 'cap', 'coat', 'contest', 'corner', 'court', 'cup', 'district', 'door', 'east', 'finger', 'garage', 'guarantee', 'hole', 'hook', 'implement', 'layer', 'lecture', 'lie', 'manner', 'meeting', 'nose', 'parking', 'partner', 'profile', 'rice', 'routine', 'schedule', 'swimming', 'telephone', 'tip', 'winter', 'airline', 'bag', 'battle', 'bed', 'bill', 'bother', 'cake', 'code', 'curve', 'designer', 'dimension', 'dress', 'ease', 'emergency', 'evening', 'extension', 'farm', 'fight', 'gap', 'grade', 'holiday', 'horror', 'horse', 'host', 'husband', 'loan', 'mistake', 'mountain', 'nail', 'noise', 'occasion', 'package', 'patient', 'pause', 'phrase', 'proof', 'race', 'relief', 'sand', 'sentence', 'shoulder', 'smoke', 'stomach', 'string', 'tourist', 'towel', 'vacation', 'west', 'wheel', 'wine', 'arm', 'aside', 'associate', 'bet', 'blow', 'border', 'branch', 'breast', 'brother', 'buddy', 'bunch', 'chip', 'coach', 'cross', 'document', 'draft', 'dust', 'expert', 'floor', 'god', 'golf', 'habit', 'iron', 'judge', 'knife', 'landscape', 'league', 'mail', 'mess', 'native', 'opening', 'parent', 'pattern', 'pin', 'pool', 'pound', 'request', 'salary', 'shame', 'shelter', 'shoe', 'silver', 'tackle', 'tank', 'trust', 'assist', 'bake', 'bar', 'bell', 'bike', 'blame', 'boy', 'brick', 'chair', 'closet', 'clue', 'collar', 'comment', 'conference', 'devil', 'diet', 'fear', 'fuel', 'glove', 'jacket', 'lunch', 'monitor', 'mortgage', 'nurse', 'pace', 'panic', 'peak', 'plane', 'reward', 'row', 'sandwich', 'shock', 'spite', 'spray', 'surprise', 'till', 'transition', 'weekend', 'welcome', 'yard', 'alarm', 'bend', 'bicycle', 'bite', 'blind', 'bottle', 'cable', 'candle', 'clerk', 'cloud', 'concert', 'counter', 'flower', 'grandfather', 'harm', 'knee', 'lawyer', 'leather', 'load', 'mirror', 'neck', 'pension', 'plate', 'purple', 'ruin', 'ship', 'skirt', 'slice', 'snow', 'specialist', 'stroke', 'switch', 'trash', 'tune', 'zone', 'anger', 'award', 'bid', 'bitter', 'boot', 'bug', 'camp', 'candy', 'carpet', 'cat', 'champion', 'channel', 'clock', 'comfort', 'cow', 'crack', 'engineer', 'entrance', 'fault', 'grass', 'guy', 'hell', 'highlight', 'incident', 'island', 'joke', 'jury', 'leg', 'lip', 'mate', 'motor', 'nerve', 'passage', 'pen', 'pride', 'priest', 'prize', 'promise', 'resident', 'resort', 'ring', 'roof', 'rope', 'sail', 'scheme', 'script', 'sock', 'station', 'toe', 'tower', 'truck', 'witness', 'can', 'will', 'other', 'use', 'make', 'good', 'look', 'help', 'go', 'great', 'being', 'still', 'public', 'read', 'keep', 'start', 'give', 'human', 'local', 'general', 'specific', 'long', 'play', 'feel', 'high', 'put', 'common', 'set', 'change', 'simple', 'past', 'big', 'possible', 'particular', 'major', 'personal', 'current', 'national', 'cut', 'natural', 'physical', 'show', 'try', 'check', 'second', 'call', 'move', 'pay', 'let', 'increase', 'single', 'individual', 'turn', 'ask', 'buy', 'guard', 'hold', 'main', 'offer', 'potential', 'professional', 'international', 'travel', 'cook', 'alternative', 'special', 'working', 'whole', 'dance', 'excuse', 'cold', 'commercial', 'low', 'purchase', 'deal', 'primary', 'worth', 'fall', 'necessary', 'positive', 'produce', 'search', 'present', 'spend', 'talk', 'creative', 'tell', 'cost', 'drive', 'green', 'support', 'glad', 'remove', 'return', 'run', 'complex', 'due', 'effective', 'middle', 'regular', 'reserve', 'independent', 'leave', 'original', 'reach', 'rest', 'serve', 'watch', 'beautiful', 'charge', 'active', 'break', 'negative', 'safe', 'stay', 'visit', 'visual', 'affect', 'cover', 'report', 'rise', 'walk', 'white', 'junior', 'pick', 'unique', 'classic', 'final', 'lift', 'mix', 'private', 'stop', 'teach', 'western', 'concern', 'familiar', 'fly', 'official', 'broad', 'comfortable', 'gain', 'rich', 'save', 'stand', 'young', 'heavy', 'lead', 'listen', 'valuable', 'worry', 'handle', 'leading', 'meet', 'release', 'sell', 'finish', 'normal', 'press', 'ride', 'secret', 'spread', 'spring', 'tough', 'wait', 'brown', 'deep', 'display', 'flow', 'hit', 'objective', 'shoot', 'touch', 'cancel', 'chemical', 'cry', 'dump', 'extreme', 'push', 'conflict', 'eat', 'fill', 'formal', 'jump', 'kick', 'opposite', 'pass', 'pitch', 'remote', 'total', 'treat', 'vast', 'abuse', 'beat', 'burn', 'deposit', 'print', 'raise', 'sleep', 'somewhere', 'advance', 'consist', 'dark', 'double', 'draw', 'equal', 'fix', 'hire', 'internal', 'join', 'kill', 'sensitive', 'tap', 'win', 'attack', 'claim', 'constant', 'drag', 'drink', 'guess', 'minor', 'pull', 'raw', 'soft', 'solid', 'wear', 'weird', 'wonder', 'annual', 'count', 'dead', 'doubt', 'feed', 'forever', 'impress', 'repeat', 'round', 'sing', 'slide', 'strip', 'wish', 'combine', 'command', 'dig', 'divide', 'equivalent', 'hang', 'hunt', 'initial', 'march', 'mention', 'spiritual', 'survey', 'tie', 'adult', 'brief', 'crazy', 'escape', 'gather', 'hate', 'prior', 'repair', 'rough', 'sad', 'scratch', 'sick', 'strike', 'employ', 'external', 'hurt', 'illegal', 'laugh', 'lay', 'mobile', 'nasty', 'ordinary', 'respond', 'royal', 'senior', 'split', 'strain', 'struggle', 'swim', 'train', 'upper', 'wash', 'yellow', 'convert', 'crash', 'dependent', 'fold', 'funny', 'grab', 'hide', 'miss', 'permit', 'quote', 'recover', 'resolve', 'roll', 'sink', 'slip', 'spare', 'suspect', 'sweet', 'swing', 'twist', 'upstairs', 'usual', 'abroad', 'brave', 'calm', 'concentrate', 'estimate', 'grand', 'male', 'mine', 'prompt', 'quiet', 'refuse', 'regret', 'reveal', 'rush', 'shake', 'shift', 'shine', 'steal', 'suck', 'surround', 'bear', 'brilliant', 'dare', 'dear', 'delay', 'drunk', 'female', 'hurry', 'inevitable', 'invite', 'kiss', 'neat', 'pop', 'punch', 'quit', 'reply', 'representative', 'resist', 'rip', 'rub', 'silly', 'smile', 'spell', 'stretch', 'stupid', 'tear', 'temporary', 'tomorrow', 'wake', 'wrap', 'yesterday', 'Thomas', 'Tom', 'Lieuwe'];

  const word1 = name1[getRandomInt(0, name1.length)];
  const word2 = name2[getRandomInt(0, name2.length)];
  return `${capFirst(word1)} ${capFirst(word2)}`;
}

// function sample(array) {
//   return array[Math.floor(Math.random() * array.length)];
// }

function randomItem(id) {
  // const containerTypes = ['drum', 'crate', 'barrel'];

  // const months = ["January", "February", "March", "April", "May", "June", "July", "August",
  // "September", "October", "November", "December"];
  // const randomMonth = months[Math.floor(Math.random() * months.length)];
  //
  // console.log("random month =>", randomMonth);
  return {
    id,
    paid: Math.random() > 0.5,
    numcontainers: Math.floor(Math.random() * 100),
    exporter: `${generateName()} Inc.`,
    created: randomDate(new Date(2000, 5, 3), new Date(2020, 5, 3)),
    cosignee: `${generateName()} Cosign`,
    shipper: `${generateName()} Shipping`,
    weight: getRandomInt(5, 200),
    volume: getRandomInt(20, 500),
  };
}

export default {
  name: 'ContainerWidget.vue',
  data() {
    return {
      active: 'SMLU-787100-1',
      chosen: [],
      items: {
        warehouse: [],
        'SMLU-787100-1': [],
        'SMLU-787100-2': [],
        'SMLU-787100-3': [],
      },
      drag: false,
      searching: false,
      results: [],
    };
  },
  computed: {
    resultIds() {
      return this.results.length === 0
        ? new Set(this.items.warehouse.map((item) => item.id))
        : new Set(this.results.map((result) => result.item.id));
    },
    activeRecords() {
      return this.items[this.active].length;
    },
    activeWeight() {
      return this.items[this.active].reduce(
        (accumulator, currentValue) => accumulator + currentValue.weight,
        0,
      );
    },
    activeVolume() {
      return this.items[this.active].reduce(
        (accumulator, currentValue) => accumulator + currentValue.volume,
        0,
      );
    },
    fuse() {
      return new Fuse(this.items.warehouse, {
        keys: ['id', 'numcontainers', 'exporter', 'shipper', 'weight', 'volume'],
      });
    },
  },
  methods: {
    search(term) {
      this.results = this.fuse.search(term);
    },
    lastFour(str) {
      return str.slice(str.length - 4);
    },
    removeContainer(container) {
      Vue.delete(this.items, container);
    },
    moveItems(from = true) {
      let source; let
        destination;
      if (from) {
        source = 'warehouse';
        destination = this.active;
      } else {
        source = this.active;
        destination = 'warehouse';
      }

      const selected = [...document.getElementsByClassName('selected')]
        .map((elem) => +elem.dataset.bol)
        .filter((bol) => this.items[source].find((elem) => elem.id === bol));

      this.items[destination] = [].concat(this.items[source]
        .filter((elem) => selected.includes(elem.id)),
      this.items[destination]);
      this.items[source] = this.items[source].filter((elem) => !selected.includes(elem.id));
    },
    clearActive() {
      this.items[this.active].forEach(
        (elem) => this.items.warehouse.push(elem),
      );
      this.items[this.active].splice(0, this.items[this.active].length);
    },
  },
  created() {
    let id = 1234;
    const containers = [
      'warehouse',
      'SMLU-787100-1',
      'SMLU-787100-2',
      'SMLU-787100-3',
    ];

    for (let containerNum = 0; containerNum < containers.length; containerNum += 1) {
      const itemCount = 20;
      for (let i = 0; i < itemCount; i += 1) {
        this.items[containers[containerNum]].push(randomItem(id));
        id += 1;
      }
    }
    this.chosen = this.items[this.active];
  },
  components: {
    ContainerWidgetSummary,
    ContainerWidgetItem,
    draggable,
  },
};
</script>

<style scoped>
.box {
  background: rgb(61,89,161);
  background: linear-gradient(135deg, rgba(61,89,161,1) 0%, rgba(101,143,185,1) 100%);
  color: white;
  border-radius: 10px;
  overflow: auto;
}

#search {
  transition: width 200ms ease;
}

[v-cloak] { display: none }

/* .selected, .sortable-chosen {
  background: #dbe5f5 !important;
} */

.selected, .sortable-chosen, .ghostItem {
  background: #dbe5f5;
  background: linear-gradient(-45deg, transparent 25%, #dbe5f5 25%, #dbe5f5 50%,
    transparent 50%, transparent 75%, #dbe5f5 75%);
  background-size: 27px 27px;
  animation: barberpole 15s infinite linear;
}

@-webkit-keyframes barberpole {
  from {background-position: 0;}
  to {background-position: 100%;}
}

.inner-box {
  height: 450px;
  overflow: auto;
}

.item {
  background-color: white;
  color: black;
  border-radius: 5px !important;
  padding: 5px 0;
  width: 100%;
  margin: auto auto 5px;
}

.item div {
  user-select: none;
}

</style>
